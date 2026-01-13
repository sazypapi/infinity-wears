"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const name = "price";

function PriceInput({ value }: { value?: number }) {
  const [price, setprice] = useState(value?.toString() || "");
  return (
    <div className="mb-2 ">
      <Label htmlFor={name} className="capitalize mb-2">
        Price (&#8358;)
      </Label>
      <Input
        id={name}
        type="number"
        onChange={(e) => setprice(e.target.value)}
        name={name}
        min={0}
        placeholder="Price in naira"
        required
        className=" border-2 border-gray-300"
        value={price}
      />
    </div>
  );
}

export default PriceInput;
