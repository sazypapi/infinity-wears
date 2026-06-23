import { Prisma } from "@/generated/prisma";
import { getAllCollectionLinks, getAllProducts } from "../../utils/actions";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
type product = Prisma.ProductGetPayload<{
  include: {
    collection: true;
    variants: true;
  };
}>;
export default async function NavbarWrapper() {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  let collections: collectionLinks[] = [];
  let products: product[] = [];
  try {
    collections = await getAllCollectionLinks();
    products = await getAllProducts();
  } catch (err) {
    console.error("Failed to load nav collections:", err);
  }
  console.log(sessionClaims?.metadata.role);

  return (
    <Navbar
      collectionLinks={collections}
      isAdmin={isAdmin}
      products={products}
    />
  );
}
