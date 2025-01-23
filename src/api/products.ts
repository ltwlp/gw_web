const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.wkk.email/api';

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// Product 接口定义了前端使用的产品类型
// id: 前端使用的标识符
// _id: 来自后端数据库的原始标识符
export interface Product {
  id: string;
  _id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    publicId: string;
    id: string;
  }>;
  category: {
    _id: string;
    id: string;
    name: string;
    description: string;
    slug: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
}

// Category 接口定义了前端使用的分类类型
// id: 前端使用的标识符
// _id: 来自后端数据库的原始标识符
export interface Category {
  _id: string;
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  categories: Category[];
}

interface RawProduct extends Omit<Product, 'id' | 'category'> {
  _id: string;
  category: Omit<Product['category'], 'id'> & { _id: string };
}

interface RawCategory extends Omit<Category, 'id'> {
  _id: string;
}

const fetchWithErrorHandling = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

// 缓存分类数据，因为分类不经常变化
let cachedCategories: Category[] | null = null;
let lastCategoriesFetch: number = 0;
const CATEGORIES_CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

async function getCategories(): Promise<Category[]> {
  const now = Date.now();
  if (cachedCategories && (now - lastCategoriesFetch) < CATEGORIES_CACHE_TTL) {
    return cachedCategories;
  }

  const rawCategories = await fetchWithErrorHandling(`${API_URL}/categories`, {
    next: {
      revalidate: 300 // 5分钟后重新验证
    }
  }) as RawCategory[];

  cachedCategories = rawCategories.map(category => ({
    ...category,
    id: category._id,
  }));
  lastCategoriesFetch = now;

  return cachedCategories;
}

export async function getProducts(
  category?: string,
  page: number = 1,
  pageSize: number = 12
): Promise<ProductsResponse> {
  try {
    // 获取分类列表（使用缓存）
    const categories = await getCategories();

    // 构建产品查询参数
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: pageSize.toString(),
      ...(category && { category }),
    });

    // 获取产品列表（使用 ISR）
    const products = await fetchWithErrorHandling(
      `${API_URL}/products?${queryParams}`,
      {
        next: {
          revalidate: 60 // 1分钟后重新验证
        }
      }
    );

    return {
      products: products.map((product: RawProduct) => ({
        ...product,
        id: product._id,
        category: {
          ...product.category,
          id: product.category._id,
        },
      })),
      total: products.total,
      categories,
    };
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  const rawProduct = await fetchWithErrorHandling(`${API_URL}/products/${id}`, {
    next: {
      revalidate: 60 // 1分钟后重新验证
    }
  }) as RawProduct;

  return {
    ...rawProduct,
    id: rawProduct._id,
    category: {
      ...rawProduct.category,
      id: rawProduct.category._id,
    },
  };
}
