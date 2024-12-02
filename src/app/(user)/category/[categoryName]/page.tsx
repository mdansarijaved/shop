import { db } from "@/lib/db";
import { Category } from "@prisma/client";

import { formatPrice } from "@/lib/utils";
import ProductList from "@/components/productList";

async function CategoryPage({ params }: { params: { categoryName: string } }) {
  // Convert string to Category enum
  const categoryName = params.categoryName.toUpperCase() as Category;

  const products = await db.product.findMany({
    where: {
      category: categoryName,
      visible: true,
    },
    include: {
      images: true,
      costPerFoot: true,
      options: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {categoryName.toLowerCase()} Collection
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
