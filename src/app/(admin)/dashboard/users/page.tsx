"use client";

import { useQuery } from "@tanstack/react-query";
import { UserDataTable } from "./user-data-table";
import { getUsers } from "@/actions/user";
import { userColumns } from "./user-columns";

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const sortedUsers = users?.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className=" w-full mx-auto py-10 px-5">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <UserDataTable
        columns={userColumns}
        data={sortedUsers || []}
        isLoading={isLoading}
      />
    </div>
  );
}
