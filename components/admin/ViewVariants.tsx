import { Card } from "@/components/ui/card";
import { ColorVariant } from "@/generated/prisma";
import { formatCurrency } from "../../utils/format";
import { Button } from "@/components/ui/button";

function ViewVariants({ variants }: { variants: ColorVariant[] }) {
  return (
    <Card className="p-4 bg-transparent border-2 border-neutral-300 shadow-2xs">
      <p className="text-neutral-400 text-sm text-left">Variants</p>
      {variants.map((variant, index) => {
        return (
          <div
            key={variant.id}
            className="border-2 border-neutral-200 shadow-2xs rounded-xl pb-2 px-4 pt-2"
          >
            <p className="text-sm text-black">Variant {index + 1}</p>
            {variant.colorName}{" "}
            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-10 gap-4">
              <div className="flex flex-col justify-start">
                <p className="text-neutral-400 text-xs ">Color Name/Color</p>
                <div className="grid grid-cols-2 gap-2">
                  <h4
                    className="text-sm text-neutral-700 capitalize"
                    style={{ color: variant.colorHex }}
                  >
                    {variant.colorName}
                  </h4>{" "}
                  <div
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: variant.colorHex }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-neutral-400 text-xs">Price</p>
                <h4 className="text-sm text-neutral-700">
                  {formatCurrency(variant.price)}
                </h4>
              </div>

              <div className="flex flex-col justify-start">
                <p className="text-neutral-400 text-xs">Discount</p>
                <h4 className="text-sm text-neutral-700 capitalize">
                  {variant.discount ? `${variant.discount}%` : "None"}
                </h4>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-neutral-400 text-xs">Instock</p>
                <h4 className="text-sm text-neutral-700">
                  {variant.inStock ? "Available" : "Not Available"}
                </h4>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-neutral-400 text-xs">Sizes</p>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {variant.sizes.map((size, index) => {
                  return (
                    <Button
                      key={index}
                      className="border-2 mr-3 border-neutral-500 bg-transparent text-neutral-500 hover:bg-white hover:text-neutral-500 hover:border-neutral-500"
                    >
                      {size}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-neutral-400 text-xs">Cover Image</p>
              <img
                src={variant.coverImage}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default ViewVariants;
