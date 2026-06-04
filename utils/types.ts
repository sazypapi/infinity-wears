export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>;
// utils/types.ts
export type SizeCategory = "clothing" | "footwear" | "accessories";
export const getSizeCategory = (sizes: string[]): SizeCategory => {
  if (sizes.length === 0) return "clothing";
  if (sizes[0] === "One Size") return "accessories";
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
  if (footwearSizes.includes(sizes[0])) return "footwear";
  return "clothing";
};
