"use client";
import { useState } from "react";
import { Star } from "lucide-react";

function StarRating({ reviewRating }: { reviewRating?: number }) {
  const [rating, setRating] = useState(reviewRating ?? 0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-4 h-4 ${
              (hover || rating) >= star ? "fill-white text-white" : "text-white"
            }`}
          />
        </button>
      ))}
      <input type="hidden" name="rating" value={rating} />
    </div>
  );
}

export default StarRating;
