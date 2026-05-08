"use client";
type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required = true,
  className,
}: FormInputProps) {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <div>
      <Label
        className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
        htmlFor={name}
      >
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        // className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
        className={cn(
          "shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]",
          className,
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;
