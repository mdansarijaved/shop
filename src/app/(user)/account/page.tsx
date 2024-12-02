import { Suspense } from "react";

import { getUserDetails } from "@/actions/user";
import { AccountSkeleton } from "@/components/account/account-skeleton";
import { UserProfile } from "@/components/account/account-form";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Details</h1>
      <div className="min-h-screen bg-background">
        <UserProfile />
      </div>
    </div>
  );
}
