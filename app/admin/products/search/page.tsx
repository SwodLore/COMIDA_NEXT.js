import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name:{
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}
export default async function SearchPage({searchParams} : { searchParams: Promise<{ search?: string }> }) {
    const { search = "" } = await searchParams;
    const products = await searchProducts(search);
    return (
        <>
            <Heading>Resultado de busqueda : {search}</Heading>
            <div className='flex flex-col gap-5 lg:flex-row lg:justify-end'>
                <ProductSearchForm />
            </div>
            {products.length ? ( <ProductTable products={products} /> ) : ( <p className='text-center'>No hay productos que coincidan con la búsqueda</p>
             )}
        </>
    )
}