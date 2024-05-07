"use client";

import { FormProvider as Form, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoneyFormField } from "./money-form-field";
import { DateFormField } from "./date-form-field";

const dateNextMonth = new Date(
  `${new Date().getMonth() + 2}/02/${new Date().getFullYear()}`
);

console.log(dateNextMonth);

const formSchema = z.object({
  amount: z.number(),
  date: z.date().min(dateNextMonth),
});

type FormSchema = z.output<typeof formSchema>;

export function DonationForm() {
  const form = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 25000,
      date: new Date(
        `${new Date().getMonth() + 1}/01/${new Date().getFullYear() + 1}`
      ),
    },
  });

  function getTotalAmount() {
    const amount = form.watch("amount");
    const date = form.watch("date");
    const now = new Date();
    const monthsFromNow =
      date.getMonth() -
      now.getMonth() +
      12 * (date.getFullYear() - now.getFullYear());

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount * monthsFromNow);
  }

  function getMonthTotalAmount() {
    const amount = form.watch("amount");

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row w-full gap-6">
          <div className="w-full sm:w-1/2">
            <MoneyFormField
              label="I can donate"
              name="amount"
              defaultValue={25000}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <DateFormField
              label="Every month until"
              name="date"
              defaultValue={25000}
            />
          </div>
        </div>

        <div className="text-center sm:text-left flex flex-col gap-6">
          <div className="flex justify-between gap-4 px-4 font-medium text-xl">
            <span>Total amount</span>
            <span className="font-bold text-[2rem]">{getTotalAmount()}</span>
          </div>
          <p className="text-xs text-gray-800 bg-slate-100 py-6 px-4">
            You will be sending <strong>{getMonthTotalAmount()}</strong> every
            month, until{" "}
            <strong>
              {form.watch("date").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </strong>
            . Thank you!
          </p>
        </div>
      </form>
    </Form>
  );
}
