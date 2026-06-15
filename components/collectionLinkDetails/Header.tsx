import { CollectionLink } from "@/generated/prisma";

function Header({ collectionLink }: { collectionLink: CollectionLink }) {
  return (
    <div
      className="relative h-20 sm:h-60 w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${collectionLink.image})` }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            {collectionLink.heading}
          </h1>
          <h3 className="sm:text-lg text-center px-3 sm:px-0 text-xs text-white">
            {collectionLink.subHeading}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
