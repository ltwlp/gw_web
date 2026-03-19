const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gwkyd.xyz/api';

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
      const errorBody = await response.text();
      console.error(`API Error Response Body: ${errorBody}`);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
    cache: 'no-store'
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
    const categories = await getCategories();

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: pageSize.toString(),
      ...(category && { category }),
    });

    const productsData = await fetchWithErrorHandling(
      `${API_URL}/products?${queryParams}`,
      {
        cache: 'no-store'
      }
    );

    const mappedProducts = productsData.docs
      .filter((product: RawProduct) => product.category)
      .map((product: RawProduct) => ({
        ...product,
        id: product._id,
        category: {
          ...product.category,
          id: product.category._id,
        },
      }));

    return {
      products: mappedProducts,
      total: productsData.totalDocs,
      categories,
    };
  } catch (error) {
    console.error('Error in getProducts:', error);
    return {
      products: [],
      total: 0,
      categories: await getCategories(),
    };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log(`Fetching product by slug: ${slug}`);
    const productsData = await fetchWithErrorHandling(
      `${API_URL}/products?slug=${slug}`,
      {
        cache: 'no-store'
      }
    );

    console.log(`Received productsData for slug ${slug}:`, productsData.docs?.length);

    if (!productsData.docs || productsData.docs.length === 0) {
      console.log(`No product found for slug: ${slug}`);
      return null;
    }

    const product = productsData.docs[0];
    
    if (!product.category) {
      console.log(`Product found but category is missing for slug: ${slug}`);
      return null;
    }

    const mappedProduct = {
      ...product,
      id: product._id,
      category: {
        ...product.category,
        id: product.category._id,
      },
    };
    console.log(`Successfully mapped product for slug: ${slug}`);
    return mappedProduct;
  } catch (error) {
    console.error('Error in getProductBySlug:', error);
    return null;
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
