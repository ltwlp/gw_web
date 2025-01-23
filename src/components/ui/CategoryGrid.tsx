'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const categories = [
  {
    id: 1,
    name: 'Limited-use Industrial\nProtective Clothing',
    displayName: 'Limited-use Industrial Protective Clothing',
    image: '/images/categories/limited-use-industrial-protective-clothing.png',
    link: '/products?category=limited-use-industrial-protective-clothing'
  },
  {
    id: 2,
    name: 'Chemical Protective\nClothing',
    displayName: 'Chemical Protective Clothing',
    image: '/images/categories/chemical-protective-clothing.png',
    link: '/products?category=chemical-protective-clothing'
  },
  {
    id: 3,
    name: 'Workwear',
    displayName: 'Workwear',
    image: '/images/categories/workwear.png',
    link: '/products?category=workwear'
  }
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 在客户端渲染之前返回一个简单的占位符
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-100" />
        </div>
        <div className="h-16 mb-4" />
        <div className="h-6" />
      </div>
    );
  }

  return (
    <Link
      href={category.link}
      className="flex flex-col items-center hover:opacity-90 transition-all duration-300 group"
    >
      {/* 圆形图片容器 */}
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-100">
          {!imageError ? (
            <Image
              src={category.image}
              alt={category.displayName}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority={index < 3}
              onLoad={() => setIsLoading(false)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">Image not available</span>
            </div>
          )}
          {isLoading && isMounted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      {/* 类别名称 */}
      <h3 className="text-xl font-medium text-center mb-4 whitespace-pre-line h-16 group-hover:text-blue-600 transition-colors duration-300">
        {category.name}
      </h3>
      
      {/* 查看产品按钮 */}
      <span className="inline-flex items-center text-blue-600 group-hover:gap-2 transition-all duration-300">
        <span>View Products</span>
        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
      </span>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Hot Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
