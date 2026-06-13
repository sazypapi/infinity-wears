import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";

import { Checkbox } from "@/components/ui/checkbox";
import { SizeCategory } from "../../utils/types";
type Props = {
  discount: number | undefined | null;
  price: number | undefined;
  inStock: boolean;
  sizes: string[];
  index: string;
  sizeCategory: SizeCategory;

  onChange: (
    index: string,
    field: "sizes" | "discount" | "inStock" | "price",
    value: any,
  ) => void;
};
function EditBottomRowInputFieldsVariantCard({
  discount,
  price,
  inStock,
  sizes,
  index,
  onChange,
  sizeCategory,
}: Props) {
  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const footwearSizes = [
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
  ];
  const availableSizes =
    sizeCategory === "clothing"
      ? clothingSizes
      : sizeCategory === "footwear"
        ? footwearSizes
        : [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center sm:gap-10 sm:mb-3 text-black">
      <div>
        <Label
          htmlFor="price"
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
          Price (&#8358;)
        </Label>
        <Input
          id="price"
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
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] text-[16px]"
          value={price ?? ""}
        />
      </div>
      <div>
        {/* DISCOUNT */}
        <Label
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
          htmlFor="name">
          Discount
        </Label>
        <Input
          id="discount"
          name="discount"
          type="number"
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] text-[16px]"
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
          id="inStock"
          name="inStock"
          checked={inStock}
          className="border-2 border-gray-600"
          onCheckedChange={(checked) =>
            onChange(index, "inStock", Boolean(checked))
          }
        />
        <label
          htmlFor="inStock"
          className="text-xs sm:text-sm leading-none text-black capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          In Stock
        </label>
      </div>
      <div>
        <Label
          className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
          htmlFor={`${index}size`}>
          Sizes
        </Label>
        {sizeCategory === "accessories" ? (
          <div className="flex items-center h-10 px-3 border-2 border-gray-300 rounded-md text-sm text-gray-500">
            One Size Fits All
          </div>
        ) : (
          <Select
            instanceId={`${index}-sizes-select`}
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
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: "7px",
                border: "2px solid #d1d5db",
                boxShadow: "0 1px 2px 0 rgba(209, 213, 219, 0.3)",
                padding: "0px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                fontSize: "16px",
              }),
            }}
            id={`${index}size`}
            placeholder="select sizes"
          />
        )}
      </div>
    </div>
  );
}

export default EditBottomRowInputFieldsVariantCard;
