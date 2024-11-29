import { Combobox } from "@/components/sort";
import ProductList from "@/components/productList";
import { db } from "@/lib/db";

async function Products() {
  // const Products = await db.product.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     images: {
  //       select: {
  //         url: true,
  //       },
  //     },
  //     description: true,
  //     category: true,
  //     isFeatured: true,
  //     isPromoted: true,
  //     discountPercent: true,
  //     slug: true,
  //     price: true,
  //   },
  // });
  return (
    <div className=" px-4 mx-auto mt-6 md:flex gap-4">
      <div className="w-full space-y-2">
        <div className="flex justify-end mt-10 md:mt-0">
          <Combobox />
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 xl:px-10 md:px-5 px-3">
          {/* {Products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Products;
