'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/api/products';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageError = () => {
    if (isMounted) {
      console.error('Image failed to load:', product.images?.[0]?.url);
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    if (isMounted) {
      console.log('Image loaded successfully:', product.images?.[0]?.url);
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden block"
    >
      {/* 产品图片容器 */}
      <div className="relative w-full pb-[75%]">
        {product.images && product.images[0] && !imageError ? (
          <>
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-300 ${
                isMounted ? 'group-hover:scale-105' : ''
              } ${isLoading && isMounted ? 'opacity-0' : 'opacity-100'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority
            />
            {isLoading && isMounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* 产品名称 */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-center line-clamp-2">{product.name}</h3>
      </div>
    </Link>
  );
}
