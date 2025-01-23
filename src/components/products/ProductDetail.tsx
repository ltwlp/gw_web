'use client';

import { Product } from '@/api/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProductDetailProps {
  product: Product | null;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.images?.[0]?.url
  );
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          {product.category && (
            <li className="flex items-center">
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category.name}
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
          )}
          <li className="text-gray-700">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 左侧：产品图片 */}
        <div>
          {/* 主图片预览 */}
          <div className="relative w-full pb-[100%] mb-6 bg-gray-100 rounded-lg overflow-hidden">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          {/* 缩略图列表 */}
          {product.images && product.images.length > 0 && (
            <div className="flex justify-center gap-4 px-4">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  className={`relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden ${
                    selectedImage === image.url
                      ? 'ring-2 ring-blue-500'
                      : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右侧：产品信息 */}
        <div>
          <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
          {/* 询价按钮 */}
          <button
            onClick={() => setShowInquiryForm(true)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors mb-8"
          >
            Inquiry Now
          </button>

          {/* 询价表单 */}
          {showInquiryForm && isMounted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Product Inquiry</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(false)}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 产品描述 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Product Description</h2>
        <table className="w-full border-collapse">
          <tbody className="divide-y divide-gray-200">
            {product.description.split('\n').map((line, index) => {
              if (!line.trim()) return null;
              const parts = line.split('**').filter(Boolean);
              if (parts.length >= 2) {
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 pl-4 pr-8 align-top font-medium text-gray-900 whitespace-nowrap">
                      {parts[0]}
                    </td>
                    <td className="py-4 pr-4 text-gray-700">
                      {parts[parts.length - 1]}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      {/* 快速导航 */}
      <div className="flex justify-between items-center border-t pt-8">
        {product.category && (
          <Link
            href={`/products?category=${product.category.slug}`}
            className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            ← Back to Category
          </Link>
        )}
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
