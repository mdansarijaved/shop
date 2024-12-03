import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatPrice } from "@/lib/utils";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, cartItems, total } = body;

    if (!user || !cartItems || !total) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const orderSummary = cartItems
      .map(
        (item: any) =>
          `${item.product.name} - Quantity: ${
            item.quantity
          } - Price: ${formatPrice(item.product.basePrice * item.quantity)}`
      )
      .join("\n");

    // Email to customer
    await resend.emails.send({
      from: "Shop <orders@resend.dev>",
      to: user.email,
      subject: "Order Confirmation - Thank you for your purchase!",
      text: `
Dear ${user.name},

Thank you for your order! Here are your order details:

Order Summary:
${orderSummary}

Total Amount: ${formatPrice(total)}

Shipping Address:
${user.userDetails?.address || "Not provided"}

Contact Information:
Email: ${user.email}
Phone: ${user.userDetails?.phone || "Not provided"}

We will process your order shortly. If you have any questions, please don't hesitate to contact us.

Best regards,
Shop Team
      `,
    });

    // Email to admin
    await resend.emails.send({
      from: "Shop <orders@resend.dev>",
      to: "javedet@gmail.com",
      subject: "New Order Received",
      text: `
New order received!

Customer Details:
Name: ${user.name}
Email: ${user.email}
Phone: ${user.userDetails?.phone || "Not provided"}
Address: ${user.userDetails?.address || "Not provided"}

Order Summary:
${orderSummary}

Total Amount: ${formatPrice(total)}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
