function Header() {
  return (
    <div
      className="relative h-20 sm:h-60 w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/cabd1b4f-9653-4636-939c-5a701ab1794a.jpg)`,
      }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            Our Best Selling Products
          </h1>
          <h3 className="sm:text-lg text-xs text-white">
            Shop our most popular items that customers love and keep coming back
            for.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
