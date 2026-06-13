function Header({ gender }: { gender: string }) {
  return (
    <div
      className="relative h-20 sm:h-60 w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/46d38e10-7c66-4279-bd14-ccb2be56b5b3.jpg)",
      }}>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white capitalize">
            {gender}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
