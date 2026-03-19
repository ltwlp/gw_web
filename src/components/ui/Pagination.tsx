'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  category
}: PaginationProps) {
  // 生成分页链接
  const getPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('page', page.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center gap-2">
        {/* 上一页 */}
        {currentPage > 1 && (
          <Link
            href={getPageLink(currentPage - 1)}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            Previous
          </Link>
        )}

        {/* 页码 */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={getPageLink(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}

        {/* 下一页 */}
        {currentPage < totalPages && (
          <Link
            href={getPageLink(currentPage + 1)}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
