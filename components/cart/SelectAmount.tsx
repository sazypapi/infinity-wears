"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateCartItemAction } from "../../utils/actions";

type SelectCartItemAmountProps = {
  amount: number;
  id: string;
};

function SelectCartItemAmount({ amount, id }: SelectCartItemAmountProps) {
  const [currentAmount, setCurrentAmount] = useState(amount);
  const [isLoading, setIsLoading] = useState(false);
  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast("Calculating....");
    const result = await updateCartItemAction({
      cartItemId: id,
      amount: value,
    });

    setCurrentAmount(value);
    toast(result?.message);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-start flex-col align-middle items-center w-20">
      <Select
        value={currentAmount.toString()}
        onValueChange={(value) => handleAmountChange(Number(value))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Array.from({ length: amount + 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={selectValue} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCartItemAmount;
