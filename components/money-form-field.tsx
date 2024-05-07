"use client";

import Image from "next/image";
import { InputHTMLAttributes } from "react";
import { useFormContext, Controller } from "react-hook-form";
import dollarIcon from "../images/icons/dollar.svg";

interface MoneyFormField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export function MoneyFormField({
  label,
  name,
  defaultValue,
  ...props
}: MoneyFormField) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-600" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="px-4 py-[15px] border rounded border-slate-200 flex gap-4">
        <Image src={dollarIcon} alt="" />
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              {...props}
              className="w-full font-medium !leading-7 text-2xl focus-visible:outline-none"
              type="text"
              value={parseValue(field.value)}
              onChange={(e) => {
                field.onChange(e.target.value.replace(/[^0-9]/g, ""));
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

function parseValue(value: string | number | readonly string[] | undefined) {
  return new Intl.NumberFormat("en-US", {}).format(Number(value ?? 0));
}
