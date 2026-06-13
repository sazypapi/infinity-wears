import Link from "next/link";

const genders = [
  { label: "Male", href: "/collections/gender/male" },
  { label: "Female", href: "/collections/gender/female" },
  { label: "Unisex", href: "/collections/gender/unisex" },
];

export default function GenderPage() {
  return (
    <div>
      <div
        className="relative h-20 sm:h-40 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/46d38e10-7c66-4279-bd14-ccb2be56b5b3.jpg')",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            SHOP BY GENDER
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl mx-auto px-5 py-10 gap-5">
        {genders.map((g) => (
          <Link
            key={g.label}
            href={g.href}
            className="border-2 border-black flex items-center justify-center h-40 text-xl font-semibold hover:bg-black hover:text-white transition duration-300">
            {g.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
