// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function HoverSwapImage({ images, alt }) {
//   const safeImages = images.filter(Boolean);
//   const [index, setIndex] = useState(0);

//   function handleMouseMove(e: { currentTarget: { getBoundingClientRect: () => { left: any; width: any; }; }; clientX: number; }) {
//     const { left, width } = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - left;
//     const zone = Math.floor((x / width) * safeImages.length);

//     setIndex(Math.min(zone, safeImages.length - 1));
//   }

//   if (!safeImages.length) return null;

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setIndex(0)}
//       className="w-36 h-48 sm:w-60 sm:h-72 relative overflow-hidden cursor-pointer"
//     >
//       <Image
//         src={safeImages[index]}
//         alt={alt}
//         fill
//         className="object-cover transition-all duration-300"
//       />
//     </div>
//   );
// }
