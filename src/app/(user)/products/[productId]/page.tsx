import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await db.product.findFirst({
    where: {
      slug: params.productId,
    },
    select: {
      id: true,
      name: true,
      category: true,
      categoryId: true,
      description: true,
      discountPercent: true,
      isPromoted: true,
      price: true,
      Review: true,
      stock: true,
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Mocking additional data that would typically come from the database
  const reviews = [
    { id: 1, author: "John Doe", rating: 5, comment: "Great product!" },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      comment: "Good value for money.",
    },
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Related Product 1",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Related Product 2",
      price: 69.99,
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image src={product.images[0].url}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((url) => (
              <Image
                src={url.url}
                alt={url.url}
                width={500}
                height={100}
                className="object-cover w-full h-[100px] "
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(32 reviews)</span>
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="space-y-2">
            <h3 className="font-semibold">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {/* {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))} */}
            </ul>
          </div>
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id}>
              <CardContent className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-2">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="font-semibold truncate">
                  {relatedProduct.name}
                </h3>
                <p className="text-sm text-gray-600">
                  ${relatedProduct.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
