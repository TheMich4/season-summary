"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserAvatar } from "@/server/update-user-avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

export const AvatarUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { update } = useSession();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async ([{ url }]) => {
      await updateUserAvatar(url);
      await update({ image: url });
      setIsUploading(false);
    },
    onUploadError: () => {
      setIsUploading(false);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }

    const file = event.target.files[0];

    startUpload([file]);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="avatar">Avatar</Label>
      <Input
        id="picture"
        type="file"
        onChange={handleUpload}
        disabled={isUploading}
      />
    </div>
  );
};
