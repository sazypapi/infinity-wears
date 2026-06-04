import { Suspense } from "react";
import Containers from "../../components/global/Containers";
import NewIn from "../../components/home/NewIn";
import LoadingContainer from "../../components/global/LoadingContainer";
import ExploreOurLatestCollection from "../../components/home/ExploreOurLatestCollection";
import CustomPiece from "../../components/home/CustomPiece";
import AlmostSoldOut from "../../components/home/AlmostSoldOut";

import ScrollVelocityComponent from "../../components/home/ScrollVelocityComponent";
import CarouselWrappers from "../../components/home/CarouselWrappers";
import CarouselSkeleton from "../../components/home/CarouselSkeleton";
import CustomPieceSkeleton from "../../components/home/CustomPieceSkeleton";

export default function Home() {
  return (
    <div>
      {/* CAROUSELS */}
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselWrappers />
      </Suspense>
      <Containers className="py-5 flex justify-center items-center align-middle w-full">
        <div className="my-5 sm:pb-5 w-full">
          <h2 className="text-2xl sm:text-4xl text-center text-neutral-700">
            New In
          </h2>
          <h6 className="text-xs sm:text-sm text-center text-neutral-400">
            Explore our latest releases
          </h6>
          <Suspense fallback={<LoadingContainer />}>
            <NewIn />
          </Suspense>
        </div>
      </Containers>
      <Suspense fallback={<CustomPieceSkeleton />}>
        <CustomPiece />
      </Suspense>
      <Containers className="py-5 flex justify-center items-center align-middle w-full">
        <div className="my-5 sm:pb-5 w-full">
          <h2 className="text-2xl sm:text-4xl text-center text-neutral-700">
            Hurry!
          </h2>
          <h6 className="text-xs sm:text-sm text-center text-neutral-400">
            These pieces are almost sold out!!
          </h6>
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
