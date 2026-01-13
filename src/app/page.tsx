import Containers from "../../components/global/Containers";
import HomeCarousel from "../../components/home/HomeCarousel";
import MobileHomeCarousel from "../../components/home/MobileHomeCarousel";
import NewIn from "../../components/home/NewIn";

export default function Home() {
  return (
    <div className="pb-30 sm:pb-0">
      {/* CAROUSELS */}
      <div className="hidden sm:inline">
        <HomeCarousel />
      </div>
      <div className="sm:hidden">
        <MobileHomeCarousel />
      </div>
      <Containers>
        <div className="mt-10">
          <NewIn />
        </div>
      </Containers>
    </div>
  );
}
