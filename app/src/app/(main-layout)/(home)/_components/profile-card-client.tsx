"use client";

import { ProfileCard } from "@/components/profile-card";

interface ProfileCardClientProps {
  name?: string | null;
  iracingId?: number | string;
  avatarUrl?: string | null;
}

export const ProfileCardClient = ({ name, iracingId, avatarUrl }: ProfileCardClientProps) => {
  return (
    <ProfileCard
      name={name}
      iracingId={iracingId}
      avatarUrl={avatarUrl}
    />
  );
}; 