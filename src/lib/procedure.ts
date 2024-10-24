import { auth } from "@/auth";

import { createServerActionProcedure } from "zsa";

const authProcedureBase = createServerActionProcedure().handler(async () => {
  try {
    const user = await auth();

    return {
      ...user,
    };
  } catch {
    throw new Error("User not authenticated");
  }
});
export const authedProcedure = authProcedureBase.createServerAction();
