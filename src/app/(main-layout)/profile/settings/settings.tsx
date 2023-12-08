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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { setCurrentUserIracingId } from "@/server/set-current-user-iracing-id";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  iracingId: z.string(),
  preferFull: z.boolean(),
});

export const Settings = ({
  userSettings,
}: {
  userSettings: { iracingId: string | null; preferFull: boolean } | null;
}) => {
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iracingId: userSettings?.iracingId ?? "",
      preferFull: userSettings?.preferFull ?? false,
    },
  });

  const onSubmit = async ({
    iracingId,
    preferFull,
  }: z.infer<typeof formSchema>) => {
    setSaving(true);

    await setCurrentUserIracingId(iracingId, preferFull);

    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">Settings</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
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
          <FormField
            control={form.control}
            name="preferFull"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormLabel htmlFor="preferFull">
                  Prefer detailed stats page:
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="!mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
