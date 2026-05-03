"use client";

import { HomeCarousel } from "@/generated/prisma";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import FormContainer from "../form/FormContainer";
import { updateCarouselItems } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import HomeCarouselItems from "./HomeCarouselItems";

function HomeCarousels({ allCarousels }: { allCarousels: HomeCarousel[] }) {
  const [carousels, setCarousels] = useState<HomeCarousel[]>(
    allCarousels.length === 0
      ? [
          {
            id: "initial",
            text: "",
            image: "",
            link: "",
            mobileImage: "",
          },
        ]
      : allCarousels,
  );
  const [imageUploaded, setImageUploaded] = useState(false);
  const updateCarousel = (
    id: string,
    field: keyof HomeCarousel,
    value: any,
  ) => {
    setCarousels((prev) =>
      prev.map((carousel) =>
        carousel.id === id ? { ...carousel, [field]: value } : carousel,
      ),
    );
  };
  // ALL IMAGES UPLOADED STUFF IS HERE
  useEffect(() => {
    const allImagesUploaded = carousels.every(
      (carousel) => carousel.image && carousel.image.length > 0,
    );
    const allMobileImagesUploaded = carousels.every(
      (carousel) => carousel.mobileImage && carousel.mobileImage.length > 0,
    );
    setImageUploaded(allImagesUploaded && allMobileImagesUploaded);
  }, [carousels]);
  const removeCarousel = (id: string) => {
    if (carousels.length === 1) {
      toast("You must have at least 1 carousel");
      return;
    } else {
      setCarousels((prev) => prev.filter((carousel) => carousel.id !== id));
    }
  };
  const addCarousel = () => {
    if (carousels.length >= 4) {
      toast("You can't have more than 4 carousels, remove one to add one");
      return;
    }
    setCarousels((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: "",
        image: "",
        link: "",
        mobileImage: "",
      },
    ]);
  };
  const carouselJson = useMemo(() => JSON.stringify(carousels), [carousels]);

  return (
    <div>
      <p className="text-left text-xs text-black mb-2">Edit Carousels</p>
      <FormContainer action={updateCarouselItems}>
        <input type="hidden" name="carousels" value={carouselJson} />

        <div className="flex gap-3 p-3 flex-col w-full border-2 border-neutral-300 rounded-md">
          {carousels.map((carousel, index) => {
            return (
              <div
                className="w-full p-1 border-b-2 border-neutral-500 last:border-none pb-5"
                key={carousel.id}
              >
                <HomeCarouselItems
                  mobileImage={carousel.mobileImage}
                  image={carousel.image}
                  index={carousel.id}
                  link={carousel.link}
                  onChange={updateCarousel}
                  text={carousel.text}
                />
                <div className="w-full flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => removeCarousel(carousel.id)}
                    className="text-red-500 bg-transparent px-2 py-1 text-xs hover:bg-red-500 hover:text-white border-2 border-red-500 transition duration-500 rounded-md"
                    type="button"
                  >
                    Remove
                  </button>
                  {index === carousels.length - 1 && (
                    <button
                      onClick={addCarousel}
                      className="text-neutral-950 bg-transparent px-2 py-1 hover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 rounded-md"
                      type="button"
                    >
                      + Add New Carousel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end w-full mt-3">
          {imageUploaded ? (
            <SubmitButton
              text="Update Carousels"
              loadingText="Updating..."
              className="text-xs bg-transparent px-2 py-1"
            />
          ) : (
            <p className="text-xs text-neutral-600 font-semibold sm:text-sm">
              Upload Images to create Carousels
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default HomeCarousels;
