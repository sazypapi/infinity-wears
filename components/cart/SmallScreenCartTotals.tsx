"use client";
import { Cart, UserProfile } from "@/generated/prisma";
import { formatCurrency } from "../../utils/format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
function SmallScreenCartTotals({
  currentCart,
  userHasAddressAndPhone,
}: {
  currentCart: Cart;
  userHasAddressAndPhone: UserProfile | null;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
      });

      const result = await res.json();

      if (result.status && result.data?.authorization_url) {
        window.location.href = result.data.authorization_url;
      } else {
        console.error(result);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-lg mb-5">Order Summary</h2>
      <div className="w-full flex flex-col justify-center items-center align-middle">
        <div className="flex justify-between align-middle w-full">
          <h4 className="text-neutral-600 text-sm">Sub Total: </h4>
          <h4 className="text-black text-sm">
            {formatCurrency(currentCart.cartTotal)}
          </h4>
        </div>
        <div className="flex justify-between align-middle w-full mt-2">
          <h4 className="text-neutral-600 text-sm">Delivery Fee: </h4>
          <h4 className="text-black text-sm">
            {formatCurrency(currentCart.shipping)}
          </h4>
        </div>{" "}
        <div className="flex justify-between align-middle w-full mt-2">
          <h4 className="text-neutral-600 text-sm">VAT: </h4>
          <h4 className="text-black text-sm">
            {formatCurrency(currentCart.tax)}
          </h4>
        </div>
      </div>
      <div className="mt-5 flex justify-between align-middle w-full">
        <h4 className="text-neutral-800 ">Order Total: </h4>
        <h4 className="text-black ">
          {formatCurrency(currentCart.orderTotal)}
        </h4>
      </div>
      {!userHasAddressAndPhone && (
        <p className="text-red-500 text-xs mt-2">
          Please add your address and phone number in your{" "}
          <Link href="/dashboard/address-book" className="underline">
            account settings
          </Link>{" "}
          before checking out.
        </p>
      )}
      <Button
        className="bg-transparent text-black border-2 border-black hover:bg-black hover:text-white transition duration-500 w-full mt-10"
        onClick={handleCheckout}
        disabled={loading || !userHasAddressAndPhone}
      >
        {loading ? (
          <>
            <ReloadIcon className="animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed to Checkout"
        )}
      </Button>
    </div>
  );
}

export default SmallScreenCartTotals;
