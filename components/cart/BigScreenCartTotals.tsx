import { Cart } from "@/generated/prisma";
import { formatCurrency } from "../../utils/format";
import { Button } from "@/components/ui/button";

function BigScreenCartTotals({ currentCart }: { currentCart: Cart }) {
  return (
    <div className="px-2">
      <h2 className="text-lg mb-10">Order Summary</h2>
      <div className="w-full flex flex-col justify-center items-center align-middle">
        <div className="flex justify-between align-middle w-full border-b border-neutral-400 ">
          <h4 className="text-neutral-600 text-sm">Sub Total: </h4>
          <h4 className="text-black text-sm">
            {formatCurrency(currentCart.cartTotal)}
          </h4>
        </div>
        <div className="flex justify-between align-middle w-full border-b border-neutral-400  mt-2">
          <h4 className="text-neutral-600 text-sm">Delivery Fee: </h4>
          <h4 className="text-black text-sm">
            {formatCurrency(currentCart.shipping)}
          </h4>
        </div>{" "}
        <div className="flex justify-between align-middle w-full border-b border-neutral-400  mt-2">
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
      <Button className="bg-transparent text-black border-2 border-black hover:bg-black hover:text-white transition duration-500 w-full mt-10">
        Checkout
      </Button>
    </div>
  );
}

export default BigScreenCartTotals;
