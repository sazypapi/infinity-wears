function Header() {
  return (
    <div
      className="relative h-20 sm:h-40 w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/1e16a754-70d7-4db3-ad81-6762371c9bc7.jpg)",
      }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="sm:text-4xl text-xl font-extrabold text-white">
            Contact Us
          </h1>
          <h3 className="sm:text-lg text-center px-3 sm:px-0 text-xs text-white">
            Have a question or inquiry? Reach out and we&apos;ll respond as soon
            as possible.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
