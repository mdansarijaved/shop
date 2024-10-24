import { PrismaClient, OrderStatus, useRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Define seed counts
const SEED_COUNTS = {
  categories: 5,
  products: 20, // Reduced for demonstration
  users: 10,
  orders: 10,
  orderItems: 30,
  reviews: 30,
  imagesPerProduct: 3, // New: number of images per product
} as const;

// Predefined unique categories to avoid duplicates
const UNIQUE_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
];

async function generateUsers() {
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "adminpassword", // In production, ensure this is hashed
      name: "Admin User",
      role: "ADMIN",
    },
  });

  const regularUsers = await Promise.all(
    Array.from({ length: SEED_COUNTS.users - 1 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: "userpassword", // In production, ensure this is hashed
          name: faker.person.fullName(),
          role: "USER",
          image: faker.image.avatar(),
        },
      })
    )
  );

  return [adminUser, ...regularUsers];
}

async function generateCategories() {
  return Promise.all(
    UNIQUE_CATEGORIES.map((name) =>
      prisma.category.create({
        data: { name },
      })
    )
  );
}

async function generateProducts(categories: any[]) {
  return Promise.all(
    Array.from({ length: SEED_COUNTS.products }).map(async () => {
      const productName = faker.commerce.productName();
      const product = await prisma.product.create({
        data: {
          name: productName,
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          stock: faker.number.int({ min: 0, max: 100 }),
          slug: faker.helpers.slugify(
            `${productName}-${faker.number.int({
              min: 1000000,
              max: 9999999,
            })}`
          ),
          categoryId: faker.helpers.arrayElement(categories).id,
          images: {
            create: Array.from({ length: SEED_COUNTS.imagesPerProduct }).map(
              () => ({
                url: `https://picsum.photos/seed/${faker.number.int()}/400/300`,
              })
            ),
          },
        },
        include: {
          images: true,
        },
      });
      return product;
    })
  );
}

async function generateOrders(users: any[], products: any[]) {
  return Promise.all(
    Array.from({ length: SEED_COUNTS.orders }).map(async () => {
      const orderItems = Array.from({
        length: faker.number.int({ min: 1, max: 5 }),
      }).map(() => {
        const product = faker.helpers.arrayElement(products);
        return {
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: product.price,
        };
      });

      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return prisma.order.create({
        data: {
          userId: faker.helpers.arrayElement(users).id,
          totalAmount,
          status: faker.helpers.arrayElement(Object.values(OrderStatus)),
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          orderItems: true,
        },
      });
    })
  );
}

async function generateReviews(products: any[], users: any[]) {
  return Promise.all(
    Array.from({ length: SEED_COUNTS.reviews }).map(() =>
      prisma.review.create({
        data: {
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.paragraph(),
          productId: faker.helpers.arrayElement(products).id,
          userId: faker.helpers.arrayElement(users).id,
        },
      })
    )
  );
}

async function main() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await prisma.$transaction([
      prisma.review.deleteMany(),
      prisma.orderItem.deleteMany(),
      prisma.order.deleteMany(),
      prisma.image.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
      prisma.account.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    console.log("✅ Cleared existing data");

    const users = await generateUsers();
    console.log(`✅ Created ${users.length} users (including admin)`);

    const categories = await generateCategories();
    console.log(`✅ Created ${categories.length} categories`);

    const products = await generateProducts(categories);
    console.log(`✅ Created ${products.length} products with images`);

    const orders = await generateOrders(users, products);
    console.log(`✅ Created ${orders.length} orders with items`);

    const reviews = await generateReviews(products, users);
    console.log(`✅ Created ${reviews.length} reviews`);

    console.log("✨ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
