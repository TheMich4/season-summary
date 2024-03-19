"use client";

import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";

import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../../../../components/ui/badge";
import type { User } from "@season-summary/prisma";
import { categoryToName } from "../../../../config/category";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  return (
    <div className="container flex flex-col gap-2">
      {users.map((user, i) => (
        <div
          className="flex flex-row items-center justify-between gap-4 rounded-md border bg-background/40 p-2"
          key={user.id}
        >
          <div className="flex flex-row items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-bold">{user.name}</div>
            <Badge variant="secondary">
              {categoryToName[user.favoriteCategory]}
            </Badge>
            {user.iracingId && (
              <Badge className="h-fit">{user.iracingId}</Badge>
            )}
          </div>

          <div className="text-xs">
            {"Created: "}
            <span className="text-muted-foreground">
              {user.createdAt.toDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
