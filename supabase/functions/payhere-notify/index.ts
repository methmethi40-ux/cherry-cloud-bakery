import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();

    const merchant_id = formData.get("merchant_id") as string;
    const order_id = formData.get("order_id") as string;
    const payhere_amount = formData.get("payhere_amount") as string;
    const payhere_currency = formData.get("payhere_currency") as string;
    const status_code = formData.get("status_code") as string;
    const md5sig = formData.get("md5sig") as string;
    const payment_id = formData.get("payment_id") as string;
    const items = formData.get("items") as string;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    // Verify the payment using MD5 signature
    const merchantSecret = Deno.env.get("PAYHERE_MERCHANT_SECRET");
    if (!merchantSecret) {
      console.error("PAYHERE_MERCHANT_SECRET not set");
      return new Response("Server config error", { status: 500, headers: corsHeaders });
    }

    // PayHere MD5 verification:
    // md5sig = upper(md5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + upper(md5(merchant_secret))))
    const encoder = new TextEncoder();
    const merchantSecretHash = await crypto.subtle.digest(
      "MD5",
      encoder.encode(merchantSecret)
    );
    const merchantSecretMd5 = Array.from(new Uint8Array(merchantSecretHash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const checkString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${merchantSecretMd5}`;
    const checkHash = await crypto.subtle.digest(
      "MD5",
      encoder.encode(checkString)
    );
    const localMd5 = Array.from(new Uint8Array(checkHash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    if (localMd5 !== md5sig) {
      console.error("MD5 signature mismatch", { localMd5, md5sig });
      return new Response("Invalid signature", { status: 403, headers: corsHeaders });
    }

    // Determine order status
    let orderStatus = "pending";
    if (status_code === "2") orderStatus = "completed";
    else if (status_code === "0") orderStatus = "pending";
    else if (status_code === "-1") orderStatus = "cancelled";
    else if (status_code === "-2") orderStatus = "failed";
    else if (status_code === "-3") orderStatus = "chargeback";

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("orders").upsert(
      {
        order_id,
        product_name: items || "Unknown",
        amount: parseFloat(payhere_amount),
        currency: payhere_currency,
        status: orderStatus,
        customer_first_name: first_name,
        customer_last_name: last_name,
        customer_email: email,
        customer_phone: phone,
        payment_id,
        payhere_status_code: status_code,
        md5sig,
      },
      { onConflict: "order_id" }
    );

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response("Database error", { status: 500, headers: corsHeaders });
    }

    console.log(`Order ${order_id} saved with status: ${orderStatus}`);
    return new Response("OK", { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("Error processing notification:", err);
    return new Response("Server error", { status: 500, headers: corsHeaders });
  }
});
