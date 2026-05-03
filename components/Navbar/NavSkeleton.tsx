// components/Navbar/NavbarSkeleton.tsx
export default function NavbarSkeleton() {
  return (
    <>
      {/* MOBILE */}
      <nav className="lg:hidden h-17 bg-black flex items-center px-5 justify-between">
        <div className="h-6 w-24 rounded-md bg-neutral-800 animate-pulse" />
        <div className="h-7 w-7 rounded-md bg-neutral-800 animate-pulse" />
      </nav>

      {/* DESKTOP */}
      <nav className="hidden lg:flex h-20 bg-black items-center justify-between px-10">
        <div className="h-7 w-28 rounded-md bg-neutral-800 animate-pulse" />

        <div className="flex gap-8 items-center">
          {[64, 80, 56, 72, 60].map((w, i) => (
            <div
              key={i}
              className="h-3.5 rounded bg-neutral-800 animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        <div className="flex gap-6 items-center">
          <div className="h-6 w-6 rounded-full bg-neutral-800 animate-pulse" />
          <div className="h-8 w-36 rounded-full bg-neutral-800 animate-pulse" />
          <div className="h-6 w-6 rounded bg-neutral-800 animate-pulse" />
        </div>
      </nav>
    </>
  );
}
