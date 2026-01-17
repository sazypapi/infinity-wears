"use client";
import ScrollVelocity from "@/components/ScrollVelocity";
function ScrollVelocityComponent() {
  return (
    <div className="w-full sm:py-10 py-5">
      <ScrollVelocity
        texts={["Infinity Wears"]}
        velocity={50}
        className="custom-scroll-text"
      />
    </div>
  );
}

export default ScrollVelocityComponent;
