import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { fetchOrCreateCart, updateCart } from "../../../../../utils/actions";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await currentUser();
  const previousCart = await fetchOrCreateCart({ userId });
  const { cartItems, currentCart } = await updateCart(previousCart);

  if (!cartItems.length) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  if (currentCart.orderTotal <= 0) {
    return NextResponse.json(
      { message: "Invalid order total" },
      { status: 400 },
    );
  }

  const email = user?.emailAddresses[0]?.emailAddress;
  console.log("Email being sent:", email);

  const orderItemsData = cartItems.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    size: item.size,
    price: item.price,
    imageUrl: item.variant.coverImage,
    quantity: item.amount,
    color: item.color,
  }));

  const totalAmount = currentCart.orderTotal;

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: totalAmount * 100,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      }),
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
