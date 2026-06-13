// app/collections/category/page.tsx
import Link from "next/link";

const categories = [
  "tshirts",
  "jeans",
  "dresses",
  "jackets",
  "activewear",
  "sweatshirts",
  "hoodies",
  "shirts",
  "shorts",
  "jorts",
  "trousers",
  "outerwear",
  "knitwear",
  "accessories",
  "footwear",
  "longsleeves",
  "tanktops",
];

export default function CategoryPage() {
  return (
    <div>
      <div
        className="relative h-20 sm:h-40 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/0eac984b-147e-4174-98d1-8c23a08ceae8.jpg')",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            SHOP BY CATEGORY
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto px-5 py-10 gap-5">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/collections/category/${category}`}
            className="border-2 border-black flex items-center justify-center h-24 text-sm font-semibold capitalize hover:bg-black hover:text-white transition duration-300">
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
