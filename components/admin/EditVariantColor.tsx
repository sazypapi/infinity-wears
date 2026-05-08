"use client";
import { Sketch } from "@uiw/react-color";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type Props = {
  colorHex: string;
  colorName: string;
  index: string;
  onChange: (
    index: string,
    field: "colorHex" | "colorName",
    value: any,
  ) => void;
};

function EditVariantColor({ colorHex, colorName, index, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-10 text-black">
      <div>
        <Label
          className="placeholder:text-[16px] sm:placeholder:text-sm"
          htmlFor="colorName"
        >
          Color Name
        </Label>
        <Input
          id="colorName"
          name="colorName"
          type="text"
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 text-[16px] sm:text-sm"
          value={colorName}
          onChange={(e) => onChange(index, "colorName", e.target.value)}
          placeholder="Enter Color Name"
          required
        />
      </div>
      <div className="flex align-middle items-center justify-center ">
        <Sketch
          width={300}
          color={colorHex}
          onChange={(color) => onChange(index, "colorHex", color.hex)}
        />
      </div>
      <div className="flex sm:gap-10 flex-col sm:items-start items-center justify-center sm:justify-end sm:flex-row gap-3 align-baseline">
        <div className="flex flex-col justify-center items-center text-center sm:justify-start">
          <p className="text-xs">
            Use the color Picker to pick the product Color
          </p>
          <p className="text-sm text-neutral-500">Current Color</p>
          <p className="text-black">{colorHex}</p>
          <div
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: colorHex }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default EditVariantColor;
