import React from "react";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1  gap-1 p-4">
      <div className="">{children}</div>
    </div>
  );
}

export default AdminLayout;
