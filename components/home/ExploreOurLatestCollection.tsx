import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLatestCollectionLink } from "../../utils/actions";

async function ExploreOurLatestCollection() {
  const latestCollectionLink = await getLatestCollectionLink();
  if (!latestCollectionLink) return null;
  return (
    <div
      className="relative h-180 w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${latestCollectionLink.image})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <Button
          asChild
          className="rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500"
        >
          <Link href={`/collections/${latestCollectionLink.collectionName}`}>
            <h1 className="text-xl">Explore our latest collection</h1>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ExploreOurLatestCollection;
