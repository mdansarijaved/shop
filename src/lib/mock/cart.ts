export const mockCartItems = [
  {
    id: "cart_1",
    product: {
      id: "prod_1",
      name: "Luxury Vinyl Flooring",
      price: 49.99,
      images: ["/flooring1.jpg"],
    },
    option: {
      id: "opt_1",
      name: "Natural Oak",
      price: 5.0,
    },
    quantity: 2,
    customNotes: "Please deliver to garage",
  },
  {
    id: "cart_2",
    product: {
      id: "prod_2",
      name: "Hardwood Flooring",
      price: 89.99,
      images: ["/flooring1.jpg"],
    },
    option: {
      id: "opt_2",
      name: "Dark Walnut",
      price: 10.0,
    },
    quantity: 1,
    customNotes: undefined,
  },
];
