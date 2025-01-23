import { getProducts } from '@/api/products';
import ProductDetail from '@/components/products/ProductDetail';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  try {
    const { products } = await getProducts();
    const product = products.find((p) => p.slug === params.slug) || null;

    if (!product) {
      notFound();
    }

    return (
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        }
      >
        <ProductDetail product={product} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Failed to load product details.</p>
        </div>
      </div>
    );
  }
}
