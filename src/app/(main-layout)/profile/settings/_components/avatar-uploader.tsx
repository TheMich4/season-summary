"use client";

import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
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
    <div className="group">
      <Input
        className="absolute left-0 top-0 size-full cursor-pointer opacity-0"
        id="avatar"
        type="file"
        onChange={handleUpload}
        disabled={isUploading}
      />
      <div className="absolute bottom-0 left-0 flex h-8 w-full cursor-pointer justify-center bg-black/80 p-2 opacity-0 group-hover:opacity-100">
        <Upload className="size-4 font-bold text-primary" />
      </div>
    </div>
  );
};
