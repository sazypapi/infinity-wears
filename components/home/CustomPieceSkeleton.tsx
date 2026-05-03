function CustomPieceSkeleton() {
  return (
    <div className="relative h-120 w-full bg-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute left-5 bottom-10 space-y-3">
        <div className="h-3 w-32 bg-gray-400 rounded" />
        <div className="h-5 w-52 bg-gray-400 rounded" />
      </div>
    </div>
  );
}
export default CustomPieceSkeleton;
