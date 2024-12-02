import { Mail, MapPin, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function UserProfileView({ user }: { user: any }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image} />
          <AvatarFallback className="text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <Badge variant="secondary" className="mt-2">
            {user.role?.toLowerCase() || "user"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.userdetails?.phone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <div className="font-medium space-y-1 mt-1">
                  <p>{user.userdetails?.address?.line}</p>
                  <p>{user.userdetails?.address?.road}</p>
                  <p>
                    {user.userdetails?.address?.city},{" "}
                    {user.userdetails?.address?.state}
                  </p>
                  <p>{user.userdetails?.address?.pincode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
