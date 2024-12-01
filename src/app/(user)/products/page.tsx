import CategoryGrid from "@/components/categoryGrid";
import ProductList from "@/components/productList";
import { db } from "@/lib/db";

async function Products() {
  const Products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      images: {
        select: {
          url: true,
        },
      },
      description: true,
      category: true,
      isFeatured: true,
      isPromoted: true,
      discountPrice: true,
      slug: true,
      price: true,
    },
  });
  return (
    <div className=" px-4 mx-auto  md:flex gap-4">
      <div className="w-full space-y-4 pt-6 pb-20">
        <CategoryGrid />
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-10  w-full   ">
          {Products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
