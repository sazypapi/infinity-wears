function Header({ categoryName }: { categoryName: string }) {
  return (
    <div
      className="relative h-20 sm:h-60 w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/a263d807-0d72-4d36-92ed-0d80a67e944a.jpg)`,
      }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white capitalize">
            {categoryName}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
