"use client";
type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required = true,
}: FormInputProps) {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <div>
      <Label className="capitalize mb-2" htmlFor={name}>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;
