function Header() {
  return (
    <div
      className="relative h-20 sm:h-40 w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/shop.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex justify-center align-middle items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            ALL OF OUR PRODUCTS
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
