import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { fetchOrCreateCart, updateCart } from "../../../../../utils/actions";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  const { userId } = await auth();
  if (!userId) redirect("/");
  const user = await currentUser();
  const previousCart = await fetchOrCreateCart({ userId });
  const { cartItems, currentCart } = await updateCart(previousCart);
  if (!reference) {
    return NextResponse.json({
      success: false,
      error: "No reference provided",
    });
  }

  // Verify with Paystack
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    },
  );

  const data = await res.json();

  if (data.status && data.data.status === "success") {
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    const orderItemsData = cartItems.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      size: item.size,
      price: item.price * (1 - item.discount / 100),
      imageUrl: item.variant.coverImage,
      quantity: item.amount,
    }));

    const totalAmount = currentCart.cartTotal;

    await db.order.create({
      data: {
        clerkId: userId,
        totalAmount,
        reference,
        status: "PAID",
        orderItems: { create: orderItemsData },
      },
    });
    await Promise.all(
      orderItemsData.map((item) =>
        db.product.update({
          where: {
            id: item.productId,
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
            sold: {
              increment: item.quantity,
            },
          },
        }),
      ),
    );

    await db.cart.delete({ where: { id: currentCart.id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}
