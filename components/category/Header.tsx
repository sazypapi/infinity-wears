import { formatCategory } from "../../utils/format-categoryName";

function Header({ categoryName }: { categoryName: string }) {
  return (
    <div
      className="relative h-20 sm:h-60 w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/72dc8d62-27b5-4f98-bfa6-6f64b2e01bbb.jpg)",
      }}>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            {formatCategory(categoryName)}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
