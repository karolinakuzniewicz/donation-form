"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { InputHTMLAttributes } from "react";
import { useFormContext, Controller } from "react-hook-form";
import arrowIcon from "../images/icons/arrow.svg";

interface MoneyFormField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export function DateFormField({
  label,
  name,
  defaultValue,
  ...props
}: MoneyFormField) {
  const { control } = useFormContext();
  const { error } = control.getFieldState(name);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-600" htmlFor={name}>
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="px-4 py-[11px] border rounded border-slate-200 flex gap-4 items-center">
            <div
              className={clsx(
                error && "cursor-not-allowed",
                !error && "hover:rounded hover:bg-slate-200 cursor-pointer",
                "p-2 h-max"
              )}
              onClick={() => {
                if (error) {
                  return;
                }

                field.onChange(
                  new Date(field.value.setMonth(field.value.getMonth() - 1))
                );
              }}
            >
              <Image
                className={error ? "cursor-not-allowed opacity-10" : ""}
                src={arrowIcon}
                alt=""
                role="button"
                aria-label="Previous month"
              />
            </div>
            <div
              {...props}
              className="w-full flex flex-col items-center justify-center"
            >
              <span className="leading-5 font-medium">
                {field.value.toLocaleString("en-US", { month: "long" })}
              </span>
              <span className="text-xs">{field.value.getFullYear()}</span>
            </div>
            <div
              className="hover:rounded hover:bg-slate-200 p-2 cursor-pointer h-max"
              onClick={() =>
                field.onChange(
                  new Date(field.value.setMonth(field.value.getMonth() + 1))
                )
              }
            >
              <Image
                src={arrowIcon}
                alt=""
                className="rotate-180 "
                role="button"
                aria-label="Next month"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
