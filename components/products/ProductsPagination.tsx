import Link from 'next/link'
import React from 'react'
type ProductsPaginationProps = {
    currentPage: number
    totalPages: number
}
export default function ProductsPagination({currentPage, totalPages} : ProductsPaginationProps) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1)
  return (
    <nav className="flex justify-center py-10">
            {currentPage > 1 && (
                <Link className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9' href={`/admin/products?page=${currentPage-1}`}>&laquo;</Link>
            )}
            {pages.map(currentPageObject => (
                <Link key={currentPageObject} className={`${currentPage === currentPageObject ? 'font-black bg-amber-400' : 'bg-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`} href={`/admin/products?page=${currentPageObject}`}>{currentPageObject}</Link>
            ))}
            {currentPage < totalPages && (
            <Link className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9'
            href={`/admin/products?page=${currentPage+1}`}>&raquo;</Link>
        )}
    </nav>
  )
}
