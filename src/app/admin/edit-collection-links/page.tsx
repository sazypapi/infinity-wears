import Containers from "../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  getAllCollectionLinks,
  getAllCollectionsForLinksWithCollectionLinks,
} from "../../../../utils/actions";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CollectionLink from "../../../../components/admin/CollectionLink";
async function EditCollectionLinks() {
  const allLinks = await getAllCollectionLinks();
  const allCollections = await getAllCollectionsForLinksWithCollectionLinks();

  if (allCollections.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Collections Found</EmptyTitle>
          <EmptyDescription>
            No collections with products exist yet.
          </EmptyDescription>
          <EmptyContent className="flex-col justify-center gap-2">
            <p className="text-[10px] text-neutral-500">
              Go to the Collections tab on the admin page to create a collection
              or add products to an existing one.
            </p>
            <Link href="/admin">
              <Button className="text-xs bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Manage Collections
              </Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Edit Collection Links
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CollectionLink
        key={allLinks.length}
        allCollectionLinks={allLinks}
        collections={allCollections}
      />
    </Containers>
  );
}

export default EditCollectionLinks;
