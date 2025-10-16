import HomeCarousel from "../../components/home/HomeCarousel";
import MobileHomeCarousel from "../../components/home/MobileHomeCarousel";

export default function Home() {
  return (
    <>
      {/* CAROUSELS */}
      <div className="hidden sm:inline">
        <HomeCarousel />
      </div>
      <div className="sm:hidden">
        <MobileHomeCarousel />
      </div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
        exercitationem nostrum error ex beatae, suscipit labore maxime ad et
        odio!
      </h1>
    </>
  );
}
