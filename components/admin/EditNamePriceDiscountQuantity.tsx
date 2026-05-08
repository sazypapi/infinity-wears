"use client";
import { Input } from "@/components/ui/input";
import { Product } from "@/generated/prisma";
import { useState } from "react";
import FormInput from "../form/FormInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditNamePriceDiscountQuantity({ product }: { product: Product }) {
  const [name, setName] = useState(product.name);
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-10 mb-4 sm:mb-5">
      <div>
        <Label
          className="capitalize mb-1 sm:mb-2 text-[16px] sm:text-sm"
          htmlFor="name"
        >
          Product Name
        </Label>
        <Input
          id="name"
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300  placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
          value={name}
          placeholder="Product Name"
          required
        />
        <input type="hidden" name="slug" value={slug} />
      </div>

      <div>
        <FormInput
          name="quantity"
          label="Quantity"
          type="number"
          placeholder="quantity"
          defaultValue={product.quantity.toString()}
        />
      </div>

      <div className="flex flex-col">
        <Label className="capitalize mb-1 sm:mb-2 text-[16px] sm:text-sm">
          Category
        </Label>
        <Select required name="category" defaultValue={product.category || ""}>
          <SelectTrigger className="border-2 w-full border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm">
            <SelectValue
              placeholder="select a category"
              className="placeholder:text-[16px] sm:placeholder:text-sm"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="TSHIRTS">T-Shirts</SelectItem>
              <SelectItem value="JEANS">Jeans</SelectItem>
              <SelectItem value="DRESSES">Dresses</SelectItem>
              <SelectItem value="JACKETS">Jackets</SelectItem>
              <SelectItem value="ACTIVEWEAR">Activewear</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default EditNamePriceDiscountQuantity;
