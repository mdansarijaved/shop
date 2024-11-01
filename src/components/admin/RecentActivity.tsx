"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Types based on your schema
type Activity = {
  id: string;
  type: "ORDER" | "USER" | "REVIEW";
  title: string;
  description: string;
  timestamp: Date;
};

async function fetchRecentActivity(): Promise<Activity[]> {
  // Fetch orders, users, and reviews with their timestamps
  const [orders, users, reviews] = await Promise.all([
    fetch("/api/orders/recent").then((res) => res.json()),
    fetch("/api/users/recent").then((res) => res.json()),
    fetch("/api/reviews/recent").then((res) => res.json()),
  ]);

  // Combine and sort all activities by timestamp
  const activities = [
    ...orders.map((order: any) => ({
      id: order.id,
      type: "ORDER" as const,
      title: "New order received",
      description: `Order #${order.id.slice(0, 8)} - Total: Rs.${
        order.totalAmount
      }`,
      timestamp: new Date(order.createdAt),
    })),
    ...users.map((user: any) => ({
      id: user.id,
      type: "USER" as const,
      title: "New user registered",
      description: `${user.name || user.email} created an account`,
      timestamp: new Date(user.createdAt),
    })),
    ...reviews.map((review: any) => ({
      id: review.id,
      type: "REVIEW" as const,
      title: "New product review",
      description: `${review.rating}★ rating with ${
        review.comment ? "comment" : "no comment"
      }`,
      timestamp: new Date(review.createdAt),
    })),
  ];

  // Sort by timestamp descending and take latest 5
  return activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{activity.title}</p>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </div>
      <div className="text-sm text-muted-foreground">
        {getTimeAgo(activity.timestamp)}
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchRecentActivity();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
    // Refresh every 5 minutes
    const interval = setInterval(loadActivities, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[76px] rounded-md border animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activity
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
