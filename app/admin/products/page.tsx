import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsPagination from '@/components/products/ProductsPagination'
import ProductTable from '@/components/products/ProductTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
async function productsCount() {
    return await prisma.product.count({})
}
async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    return await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    })
}
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>
export default async function ProductsPage({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { page = "1" } = await searchParams;
  const pageSize = 10
  const currentPage = parseInt(page as string, 10) || 1;
  if(currentPage < 0) redirect(`/admin/products`)
  
  const productsData = getProducts(currentPage , pageSize)
  const totalData = productsCount()
  const [products, total] = await Promise.all([productsData, totalData])
  const totalPages = Math.ceil(total / pageSize)
  if(currentPage > totalPages) redirect(`/admin/products`)
  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className='flex flex-col gap-5 lg:flex-row lg:justify-between'>
        <Link href={`/admin/products/new`} className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'>Crear Producto</Link>
        <ProductSearchForm />
      </div>
      <ProductTable products={products} />
      <ProductsPagination currentPage={currentPage} totalPages={totalPages}/>
    </>
  )
}
