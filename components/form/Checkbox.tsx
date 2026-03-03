"use client";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

import React, { useState } from "react";

function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  const [inStock, setInStock] = useState(defaultChecked);
  const toggleStockState = () => {
    setInStock(!inStock);
  };
  return (
    <div className="flex align-middle items-center space-x-2">
      {/* <input type="hidden" name={name} value={inStock ? "true" : "false"} /> */}
      <Checkbox
        id={name}
        name={name}
        defaultChecked={inStock}
        className="border-2 border-gray-600"
        onCheckedChange={toggleStockState}
      />
      <label
        htmlFor={name}
        className="text-sm leading-none text-black capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxInput;
