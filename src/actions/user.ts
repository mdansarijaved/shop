// src/actions/user.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getUserDetails() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      userdetails: {
        include: {
          address: true,
        },
      },
    },
  });

  return user;
}

export async function updateUserDetails(values: {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    line: string;
    road: string;
    city: string;
    state: string;
    pincode: string;
  };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const { address, ...rest } = values;

  // First, ensure userDetails exists
  const userDetails = await db.userDetails.upsert({
    where: {
      id: session.user.id,
    },
    create: {
      phone: values.phone || "",
      address: {
        create: {
          line: "",
          road: "",
          city: "",
          state: "",
          pincode: "",
        },
      },
      User: {
        connect: { id: session.user.id },
      },
    },
    update: {
      phone: values.phone,
    },
  });

  if (address) {
    // Now create/update address
    await db.address.upsert({
      where: {
        id: userDetails.id,
      },
      create: {
        ...address,
        userDetails: {
          connect: { id: userDetails.id },
        },
      },
      update: address,
    });
  }

  return await getUserDetails();
}

export const getCurrentUser = async () => {
  const user = await auth();
  if (!user) {
    return;
  }
  const currentUser = await db.user.findUnique({
    where: {
      email: user.user.email!,
    },
    include: {
      userdetails: {
        include: {
          address: true,
        },
      },
    },
  });
  return currentUser;
};

export const getSession = async () => {
  const user = await auth();
  return user;
};

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        userdetails: {
          select: {
            phone: true,
            address: true,
          },
        },
      },
    });

    if (!users) {
      throw new Error("No current users");
    }

    return users;
  } catch (error) {
    console.log(error);
  }
};
