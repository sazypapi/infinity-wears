// components/home/CarouselSkeleton.tsx
export default function CarouselSkeleton() {
  return (
    <>
      <div className="hidden sm:block relative h-[90vh] w-full bg-neutral-200 animate-pulse">
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-neutral-400" />
          ))}
        </div>
      </div>

      <div className="sm:hidden relative h-[90vh] w-full bg-neutral-200 animate-pulse">
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-neutral-400" />
          ))}
        </div>
      </div>
    </>
  );
}
