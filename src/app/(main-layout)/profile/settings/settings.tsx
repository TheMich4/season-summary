"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { setCurrentUserIracingId } from "@/server/set-current-user-iracing-id";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  iracingId: z.string(),
});

export const Settings = ({
  userSettings,
}: {
  userSettings: { iracingId: string | null } | null;
}) => {
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iracingId: userSettings?.iracingId ?? "",
    },
  });

  const onSubmit = async ({ iracingId }: z.infer<typeof formSchema>) => {
    setSaving(true);
    console.log({ iracingId });

    await setCurrentUserIracingId(iracingId);

    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">Settings</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="iracingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="iracingId">iRacing ID:</FormLabel>
                <FormControl>
                  <Input placeholder="Your iRacing ID" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-44" disabled={saving}>
            Save settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
