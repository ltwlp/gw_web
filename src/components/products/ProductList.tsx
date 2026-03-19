import { Product } from '@/api/products';
import ProductCard from './ProductCard';
import Pagination from '../ui/Pagination';

interface ProductListProps {
  products: Product[];
  currentPage: number;
  totalProducts: number;
  category?: string;
}

export default function ProductList({
  products,
  currentPage,
  totalProducts,
  category
}: ProductListProps) {
  const pageSize = 12;
  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div>
      {/* 产品网格 */}
      {!products || products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 分页导航 */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
          />
        </div>
      )}
    </div>
  );
}
