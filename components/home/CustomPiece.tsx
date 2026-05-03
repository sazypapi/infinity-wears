import Link from "next/link";
import { getCustomPieceBg } from "../../utils/actions";

async function CustomPiece() {
  const customPieceBG = await getCustomPieceBg();
  return (
    <>
      <div
        className="hidden sm:block sm:relative h-120 w-full bg-cover bg-center"
        style={{
          backgroundImage: customPieceBG
            ? `url(${customPieceBG.image})`
            : "url('/images/CustomPiece.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* <Button
          asChild
          className="rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500"
        > */}
          <div className="absolute left-5 bottom-10">
            <h2 className="text-sm text-white mb-5">Want to get Creative?</h2>
            <Link href="/create-customorder">
              <h1 className="text-xl text-white hover:underline">
                Design a custom a piece
              </h1>
            </Link>
          </div>
          {/* </Button> */}
        </div>
      </div>
      <div
        className="relative sm:hidden h-120 w-full bg-cover bg-center"
        style={{
          backgroundImage: customPieceBG
            ? `url(${customPieceBG.mobileImage})`
            : "url('/images/CustomPiece.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* <Button
          asChild
          className="rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500"
        > */}
          <div className="absolute left-5 bottom-10">
            <h2 className="text-sm text-white mb-5">Want to get Creative?</h2>
            <Link href="#">
              <h1 className="text-xl text-white hover:underline">
                Design a custom a piece
              </h1>
            </Link>
          </div>
          {/* </Button> */}
        </div>
      </div>
    </>
  );
}

export default CustomPiece;
