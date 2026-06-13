// loading.tsx (next to your page.tsx)

export default function loading() {
  return (
    <>
      <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mx-auto mt-5 mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[50vh] w-full bg-gray-200 animate-pulse" />
        ))}
      </div>
    </>
  );
}
