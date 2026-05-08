import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";

import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  discount: number | undefined | null;
  price: number | undefined;
  inStock: boolean;
  sizes: string[];
  index: string;
  onChange: (
    index: string,
    field: "sizes" | "discount" | "inStock" | "price",
    value: any,
  ) => void;
};

function BottomRowInputFieldsVariantCard({
  discount,
  price,
  inStock,
  sizes,
  index,
  onChange,
}: Props) {
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center sm:gap-10 sm:mb-3 text-black">
      <div>
        <Label
          htmlFor={`${index}price`}
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
        >
          Price (&#8358;)
        </Label>
        <Input
          id={`${index}price`}
          type="number"
          onChange={(e) =>
            onChange(
              index,
              "price",
              e.target.value === "" ? undefined : Number(e.target.value),
            )
          }
          name="price"
          min={0}
          placeholder="Price in naira"
          required
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm"
          value={price ?? ""}
        />
      </div>
      <div>
        {/* DISCOUNT */}
        <Label
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
          htmlFor={`${index}name`}
        >
          Discount
        </Label>
        <Input
          id={`${index}name`}
          name="discount"
          type="number"
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm"
          placeholder="Discount(%)"
          onChange={(e) => onChange(index, "discount", Number(e.target.value))}
          value={discount ?? ""}
          step="0.01"
          max="100"
          min="0"
        />
      </div>
      <div className="flex align-middle items-center space-x-2">
        <Checkbox
          id={`${index}instock`}
          name="inStock"
          checked={inStock}
          className="border-2 border-gray-600"
          onCheckedChange={(checked) =>
            onChange(index, "inStock", Boolean(checked))
          }
        />
        <label
          htmlFor={`${index}instock`}
          className="sm:text-sm text-xxs leading-none text-black capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          In Stock
        </label>
      </div>
      <div>
        <Label
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
          htmlFor={`${index}size`}
        >
          Sizes
        </Label>
        <Select
          instanceId="sizes-select"
          isMulti
          value={sizes.map((s) => ({ value: s, label: s }))}
          options={availableSizes.map((s) => ({ value: s, label: s }))}
          onChange={(selected) =>
            onChange(
              index,
              "sizes",
              selected.map((item) => item.value),
            )
          }
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,

              borderRadius: "7px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }),
          }}
          id={`${index}size`}
          required
        />
      </div>
    </div>
  );
}

export default BottomRowInputFieldsVariantCard;
