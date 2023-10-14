"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  searchTerm: z.string().min(3),
});

export const IracingIdInput = () => {
  const router = useRouter();
  const [routing, setRouting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = async ({ searchTerm }: z.infer<typeof formSchema>) => {
    setRouting(true);

    if (isNaN(Number(searchTerm))) {
      await router.push(`/search?q=${searchTerm}`);
    } else {
      await router.push(`/driver/${searchTerm}`);
    }

    setRouting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-2 md:w-[640px] md:flex-row md:justify-self-center"
      >
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Search for iRacing profile"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-44" disabled={routing}>
          Go to Profile
        </Button>
      </form>
    </Form>
  );
};
