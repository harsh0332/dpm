import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_live_SdppA5AGlfgn4i";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "rUSIZ4cEZ7vWx5y2dDCr3J5j";

    if (!keyId || !keySecret) {
      return NextResponse.json({ success: false, error: "Razorpay credentials not configured" }, { status: 500 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: 99900, // 999 INR in paise
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          payment_type: "dpm_pageant_2026",
          site_source: "register.dpmentertainment.com",
          name: name,
          email: email,
          phone: phone,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Razorpay order API error:", errText);
      return NextResponse.json({ success: false, error: "Failed to create order in Razorpay" }, { status: 400 });
    }

    const orderData = await response.json();
    return NextResponse.json({
      success: true,
      order_id: orderData.id,
      amount: orderData.amount,
      key_id: keyId,
    }, { status: 200 });
  } catch (error: any) {
    console.error("Create order handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
