import Link from "next/link";

function CollectionComponents({
  link,
  image,
  heading,
  subHeading,
}: {
  link: string;
  image: string;
  heading: string;
  subHeading?: string;
}) {
  return (
    <Link href={link}>
      <div className="overflow-hidden transition duration-500">
        <div
          className="relative h-[50vh] w-full bg-cover bg-center transition duration-500 hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-base sm:text-xl font-bold text-white">
              {heading}
            </h1>
            <h2 className="text-sm sm:text-lg text-white text-center px-4">
              {subHeading}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CollectionComponents;
