import { getProducts } from '@/api/products';
import ProductList from '@/components/products/ProductList';
import Link from 'next/link';

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page = '1', category } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  try {
    const { products, total, categories } = await getProducts(category, currentPage);

    if (!products || !categories) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">No products available.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 分类侧边栏 */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className={`block px-4 py-2 rounded-lg ${
                      !category
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className={`block px-4 py-2 rounded-lg ${
                        category === cat.slug
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 产品列表 */}
          <div className="flex-1">
            <ProductList
              products={products}
              currentPage={currentPage}
              totalProducts={total}
              category={category}
            />
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">An error occurred while loading products.</p>
      </div>
    );
  }
}
