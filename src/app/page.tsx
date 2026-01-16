import { Suspense } from "react";
import Containers from "../../components/global/Containers";
import HomeCarousel from "../../components/home/HomeCarousel";
import MobileHomeCarousel from "../../components/home/MobileHomeCarousel";
import NewIn from "../../components/home/NewIn";
import LoadingContainer from "../../components/global/LoadingContainer";
import ExploreOurLatestCollection from "../../components/home/ExploreOurLatestCollection";
import CustomPiece from "../../components/home/CustomPiece";
import AlmostSoldOut from "../../components/home/AlmostSoldOut";

import ScrollVelocityComponent from "../../components/home/ScrollVelocityComponent";

export default function Home() {
  return (
    <div>
      {/* CAROUSELS */}
      <div className="hidden sm:inline">
        <HomeCarousel />
      </div>
      <div className="sm:hidden">
        <MobileHomeCarousel />
      </div>
      <Containers className="py-5">
        <div className="my-5 sm:pb-5">
          <Suspense fallback={<LoadingContainer />}>
            <NewIn />
          </Suspense>
        </div>
      </Containers>
      <CustomPiece />
      <Containers className="py-5">
        <div className="my-5">
          <Suspense fallback={<LoadingContainer />}>
            <AlmostSoldOut />
          </Suspense>
        </div>
      </Containers>
      <ExploreOurLatestCollection />
      <ScrollVelocityComponent />
    </div>
  );
}
