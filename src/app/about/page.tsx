import Containers from "../../../components/global/Containers";
import CircularGallery from "@/components/CircularGallery";
import TextType from "@/components/TextType";
import ScrollVelocity from "@/components/ScrollVelocity";

function AboutPage() {
  return (
    <div className="w-full pb-10">
      <Containers className="pt-5 px-2">
        <h1 className="text-center sm:text-xl text-3xl">
          <TextType
            text={[
              "Welcome to Infinity Wears",
              "Learn about us",
              "Join the family",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
          />
        </h1>
      </Containers>
      <div className="w-full h-40 sm:h-90">
        <CircularGallery />
      </div>
      <Containers className="px-2 mt-5">
        <p className="text-neutral-700 sm:text-lg text-sm text-center">
          <span className="text-black sm:text-xl text-lg font-semibold">
            Infinity Wears
          </span>{" "}
          is more than just a clothing brand, it’s a statement of identity,
          confidence, and purpose. We believe fashion should not only look good
          but also represent something deeper.
        </p>
      </Containers>
      <h3 className="text-base sm:text-xl text-black text-center mt-15">
        Infinity Wears isn’t just about clothing.
      </h3>
      <ScrollVelocity
        texts={["It’s about wearing confidence, purpose, and limitless style."]}
        velocity={50}
        className="custom-scroll-text"
      />
    </div>
  );
}

export default AboutPage;
