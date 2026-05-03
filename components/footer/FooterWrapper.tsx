import Footer from "./Footer";
import { getAllCollectionLinks } from "../../utils/actions";
import { Suspense } from "react";

async function FooterWrapper() {
  const collectionLinks = await getAllCollectionLinks();
  return (
    <Suspense fallback={<div className="w-full h-80 bg-black animate-pulse" />}>
      <Footer collectionLinks={collectionLinks} />
    </Suspense>
  );
}

export default FooterWrapper;
