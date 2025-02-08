import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string | undefined) {
  if (!category) return [];
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  });
}
export default async function OrderPage({params} : {params: Promise<{ category?: string }>}) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;

  if (!category) {
    return <div className="text-center text-red-500">Error: Categoría no encontrada</div>;
  }
  const products = await getProducts(category);
  return (
    <>
    <Heading>
      Elige y personaliza tu pedido a continuacion
    </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
