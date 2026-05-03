import { Prisma } from "@/generated/prisma";
import { getAllCollectionLinks } from "../../utils/actions";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
export default async function NavbarWrapper() {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  let collections: collectionLinks[] = [];
  try {
    collections = await getAllCollectionLinks();
  } catch (err) {
    console.error("Failed to load nav collections:", err);
  }

  return <Navbar collectionLinks={collections} isAdmin />;
}
