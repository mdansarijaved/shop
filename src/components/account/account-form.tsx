"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { getUserDetails, updateUserDetails } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfileForm } from "./user-profile-form";
import { UserProfileView } from "./user-profile-view";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] =
    useState<Awaited<ReturnType<typeof getUserDetails>>>();

  useState(() => {
    getUserDetails().then(setUser);
  });

  async function onSubmit(data: any) {
    try {
      const updatedUser = await updateUserDetails(data);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  }

  if (!user) return null;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <Card className="relative">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4"
            >
              <Pencil className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <div className="p-6">
          {isEditing ? (
            <UserProfileForm user={user} onSubmit={onSubmit} />
          ) : (
            <UserProfileView user={user} />
          )}
        </div>
      </Card>
    </div>
  );
}
