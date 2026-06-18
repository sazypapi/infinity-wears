import React from "react";
import { isContactExists } from "../../../../utils/actions";
import SplitText from "@/components/SplitText";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function ConfirmContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isContact = await isContactExists(id);
  if (!isContact) {
    redirect("/contact");
  }
  return (
    <div className="relative h-[90vh] bg-[url('https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/a7b972de-d64f-407f-b15f-bf8e58f18996.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Blur + dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex text-white flex-col items-center justify-center h-full gap-4">
        <>
          <h1 className="text-2xl capitalize">
            <SplitText
              text={`Hello, ${isContact?.name}!`}
              className="text-2xl font-semibold text-center"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>
          <h3>
            We&lsquo;ve received your message and will get back to you as soon
            as possible!
          </h3>
          <div className="flex align-middle items-center gap-3">
            <Link href="/" className="hover:cursor-pointer">
              <Button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition duration-500">
                Go Home
              </Button>
            </Link>
            <Link href="/shop" className="hover:cursor-pointer">
              <Button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition duration-500">
                Shop
              </Button>
            </Link>
          </div>
        </>
      </div>
    </div>
  );
}

export default ConfirmContactPage;
