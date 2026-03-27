import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const OrderSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  phone: z.string().min(6).max(20).trim(),
  email: z.string().email().max(100).trim(),
  address: z.string().min(5).max(200).trim(),
  city: z.string().min(1).max(100).trim(),
  country: z.string().min(2).max(100).trim(),
  productId: z.string().min(1).max(100).trim(),
  productName: z.string().min(1).max(200).trim(),
  quantity: z.number().int().min(1).max(100),
  message: z.string().max(500).optional().default(""),
  currency: z.string().min(2).max(10).trim(),
  displayedPrice: z.string().max(50).trim(),
});

// Sanitize value to prevent Google Sheets formula injection
function sanitizeCell(value: string): string {
  const str = String(value).trim();
  if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
    return `'${str}`;
  }
  return str;
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin") ?? "";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

    // CORS check in production
    if (siteUrl && origin && !origin.startsWith(siteUrl) && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      // Dev mode: log and return success
      console.log("[DEV] Order received:", data);
      return NextResponse.json({ success: true, mode: "dev" });
    }

    const now = new Date();
    const payload = {
      date: now.toLocaleDateString("fr-FR"),
      time: now.toLocaleTimeString("fr-FR"),
      firstName: sanitizeCell(data.firstName),
      lastName: sanitizeCell(data.lastName),
      phone: sanitizeCell(data.phone),
      email: sanitizeCell(data.email),
      address: sanitizeCell(data.address),
      city: sanitizeCell(data.city),
      country: sanitizeCell(data.country),
      product: sanitizeCell(data.productName),
      quantity: data.quantity,
      price: sanitizeCell(data.displayedPrice),
      currency: sanitizeCell(data.currency),
      message: sanitizeCell(data.message ?? ""),
    };

    const sheetsRes = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!sheetsRes.ok) {
      throw new Error(`Apps Script responded with ${sheetsRes.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ORDER] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
