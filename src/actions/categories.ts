"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const fetchCategories = async () => {
  const user = await auth();

  if (user?.user.role != "ADMIN") {
    return;
  }
  try {
    const categories = await db.category.findMany();
    console.log("categories i got called");
    console.log(categories);

    if (!categories) {
      console.log("there are no categories");
      throw new Error("no categories  ");
    }

    return categories;
  } catch (error) {
    console.log("error: ", error);
  }
};
