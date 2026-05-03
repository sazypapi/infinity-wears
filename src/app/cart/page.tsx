import Containers from "../../../components/global/Containers";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  fetchOrCreateCart,
  isAddressAndPhone,
  updateCart,
} from "../../../utils/actions";
import { redirect } from "next/navigation";
import { PiEmptyBold } from "react-icons/pi";
import Footer from "../../../components/footer/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "../../../components/cart/Header";
import BigScreenCart from "../../../components/cart/BigScreenCart";
import SmallScreenCart from "../../../components/cart/SmallScreenCart";

async function CartPage() {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) redirect("/");
  const userHasAddressAndPhone = await isAddressAndPhone();

  const previousCart = await fetchOrCreateCart({ userId });
  const { cartItems, currentCart } = await updateCart(previousCart);
  if (cartItems.length === 0) {
    return (
      <>
        <Containers className="h-[70vh] sm:mt-14 flex align-middle items-center justify-center">
          <div className="flex items-center justify-center flex-col ">
            <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
              <PiEmptyBold /> No items in cart
            </h1>
            <Button className="bg-transparent  text-black border-2 mt-4 border-black hover:bg-black hover:text-white transition duration-500">
              <Link href="/">Add Items</Link>
            </Button>
          </div>
        </Containers>
      </>
    );
  }
  return (
    <Containers className="lg:mt-15 py-5 px-2">
      <Header name={user?.firstName || ""} />
      <div className="hidden lg:flex">
        <BigScreenCart
          cartItems={cartItems}
          currentCart={currentCart}
          userHasAddressAndPhone={userHasAddressAndPhone}
        />
      </div>
      <div className="flex lg:hidden">
        <SmallScreenCart
          cartItems={cartItems}
          currentCart={currentCart}
          userHasAddressAndPhone={userHasAddressAndPhone}
        />
      </div>
    </Containers>
  );
}

export default CartPage;
