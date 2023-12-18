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
import { Switch } from "@/components/ui/switch";
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
    <div className="flex w-full flex-col gap-4">
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
                  <Input
                    className="dark:bg-background/40"
                    placeholder="Your iRacing ID"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="preferFull">Favorite category:</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        buttonVariants({ variant: "outline", size: "xs" }),
                        "gap-1 dark:bg-background/40 h-10 mt-2"
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

          <FormField
            control={form.control}
            name="preferFull"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 text-center">
                <FormControl>
                  <Switch
                    className="!mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="preferFull" className="!m-0">
                  Prefer detailed stats page:
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 flex w-full flex-row gap-2"
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
