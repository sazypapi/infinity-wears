import { getHomeCarouselImages } from "../../utils/actions";
import HomeCarouselComponent from "./HomeCarousel";
import MobileHomeCarousel from "./MobileHomeCarousel";

async function CarouselWrappers() {
  const carouselItems = await getHomeCarouselImages();
  return (
    <>
      <div className="hidden sm:flex">
        <HomeCarouselComponent carouselItems={carouselItems} />
      </div>
      <div className="sm:hidden flex">
        <MobileHomeCarousel carouselItems={carouselItems} />
      </div>
    </>
  );
}

export default CarouselWrappers;
