// ============================================================
// OWNER NOTIFICATION SETTINGS
// ============================================================
// Set your WhatsApp number below (with country code, no + sign)
// Example: "94771234567" for a Sri Lankan number
// ============================================================
export const OWNER_WHATSAPP_NUMBER = "94XXXXXXXXX"; // ← Replace with your number

export const sendWhatsAppNotification = (
  orderDetails: {
    orderId: string;
    productName: string;
    quantity: number;
    total: number;
    customerName: string;
    customerPhone: string;
  }
) => {
  const message = encodeURIComponent(
    `🧁 *New Order — Cherry Cloud Bakers*\n\n` +
    `Order ID: ${orderDetails.orderId}\n` +
    `Product: ${orderDetails.productName}\n` +
    `Qty: ${orderDetails.quantity}\n` +
    `Total: LKR ${orderDetails.total.toFixed(2)}\n\n` +
    `Customer: ${orderDetails.customerName}\n` +
    `Phone: ${orderDetails.customerPhone}`
  );

  window.open(
    `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${message}`,
    '_blank'
  );
};
