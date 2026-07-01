import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, whatsapp_number } = body;

    // Basic validation
    if (!full_name || !email || !whatsapp_number) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhookUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/register-form-submit";
    // Server-side fetch to Google Sheets — no CORS issues, works on all browsers/devices
    const sheetsRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // No CORS mode needed — this is server-to-server
      redirect: "follow",
    });

    console.log("Lead captured to Google Sheets, status:", sheetsRes.status);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", error);
    // Still return 200 so client doesn't retry endlessly
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 200 });
  }
}
