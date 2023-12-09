"use client";

import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { Categories, Category, categoryToName } from "@/config/category";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setCurrentUserConfig } from "@/server/set-current-user-config";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  iracingId: z.string(),
  preferFull: z.boolean(),
  category: z.string(),
});

export const Settings = ({
  userSettings,
}: {
  userSettings: {
    iracingId: string | null;
    preferFull: boolean;
    favoriteCategory: string;
  } | null;
}) => {
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iracingId: userSettings?.iracingId ?? "",
      preferFull: userSettings?.preferFull ?? false,
      category: userSettings?.favoriteCategory ?? Categories.ROAD,
    },
  });

  const onSubmit = async ({
    iracingId,
    preferFull,
    category,
  }: z.infer<typeof formSchema>) => {
    setSaving(true);

    await setCurrentUserConfig(iracingId, preferFull, category as Category);

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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormLabel htmlFor="preferFull">Favorite category:</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        buttonVariants({ variant: "outline", size: "xs" }),
                        "gap-1 dark:bg-background/40"
                      )}
                    >
                      <ChevronDown className="h-5 w-5" />
                      {categoryToName[field.value as Category]}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      {Object.entries(categoryToName).map(([cat, catName]) => (
                        <DropdownMenuItem asChild key={catName}>
                          <span
                            onClick={() =>
                              form.setValue("category", cat as Category)
                            }
                          >
                            {catName}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-44 flex flex-row gap-2 "
            disabled={saving}
          >
            {saving && <Loader2 className="animate-spin" />}
            Save settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
