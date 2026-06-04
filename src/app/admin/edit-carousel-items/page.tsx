import {
  getCollectionsForHomeCarousel,
  getHomeCarouselImages,
} from "../../../../utils/actions";
import Containers from "../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HomeCarousels from "../../../../components/admin/HomeCarousels";

async function EditCarouselImages() {
  const carousels = await getHomeCarouselImages();
  const collections = await getCollectionsForHomeCarousel();
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/admin">
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Edit Home Carousels
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-8 capitalize">edit carousels</h1>
      <HomeCarousels allCarousels={carousels} collections={collections} />
    </Containers>
  );
}

export default EditCarouselImages;
