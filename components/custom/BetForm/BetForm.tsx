"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const FormSchema = z.object({
  bet: z.number().min(1, {
    message: "Bet amount must be at least 1",
  }),
});

export function BetForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bet: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bet"
          render={({ field }) => (
            <FormItem className="">
              <div className="h-[44px] w-[500px] relative">
                <FormControl>
                  <Input
                    placeholder="bet amount"
                    {...field}
                    className="h-full w-full pl-[71px] border-none"
                  />
                </FormControl>
                <div className="flex items-center h-full absolute left-2 top-0 bottom-0">
                  <Image
                    src={"/icons/chip_icon.svg"}
                    width={15}
                    height={15}
                    alt="chip_icon"
                    className=" shrink-0 "
                  />
                </div>

                <div className="buttons-block absolute right-0 top-0 bottom-0 h-full flex items-center justify-end gap-[2px]">
                  <Button
                    type="button"
                    className="h-9 bg-bet-black font-semibold"
                  >
                    1/2
                  </Button>
                  <Button
                    type="button"
                    className="h-9 bg-bet-black font-semibold"
                  >
                    x2
                  </Button>
                  <Button
                    type="button"
                    className="h-9 bg-bet-black font-semibold"
                  >
                    x4
                  </Button>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
