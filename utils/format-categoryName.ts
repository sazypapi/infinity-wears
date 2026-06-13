export enum Category {
  TSHIRTS = "TSHIRTS",
  JEANS = "JEANS",
  DRESSES = "DRESSES",
  JACKETS = "JACKETS",
  ACTIVEWEAR = "ACTIVEWEAR",
  SWEATSHIRTS = "SWEATSHIRTS",
  HOODIES = "HOODIES",
  SHIRTS = "SHIRTS",
  SHORTS = "SHORTS",
  JORTS = "JORTS",
  TROUSERS = "TROUSERS",
  OUTERWEAR = "OUTERWEAR",
  KNITWEAR = "KNITWEAR",
  ACCESSORIES = "ACCESSORIES",
  FOOTWEAR = "FOOTWEAR",
  LONGSLEEVES = "LONGSLEEVES",
  TANKTOPS = "TANKTOPS",
}

const categoryLabels: Record<Category, string> = {
  TSHIRTS: "T-Shirts",
  JEANS: "Jeans",
  DRESSES: "Dresses",
  JACKETS: "Jackets",
  ACTIVEWEAR: "Activewear",
  SWEATSHIRTS: "Sweatshirts",
  HOODIES: "Hoodies",
  SHIRTS: "Shirts",
  SHORTS: "Shorts",
  JORTS: "Jorts",
  TROUSERS: "Trousers",
  OUTERWEAR: "Outerwear",
  KNITWEAR: "Knitwear",
  ACCESSORIES: "Accessories",
  FOOTWEAR: "Footwear",
  LONGSLEEVES: "Long Sleeves",
  TANKTOPS: "Tank Tops",
};

export function formatCategory(category: string): string {
  const upper = category.toUpperCase();

  return (
    categoryLabels[upper as Category] ??
    category
      .toLowerCase()
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
