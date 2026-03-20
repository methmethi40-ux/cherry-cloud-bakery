declare global {
  interface Window {
    payhere: {
      startPayment: (payment: Record<string, unknown>) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: string) => void;
    };
  }
}

export const PAYHERE_MERCHANT_ID = "1233839 "; // Replace with your merchant ID

const NOTIFY_URL = `https://kwcbxbuqpxjahfwbsqvy.supabase.co/functions/v1/payhere-notify`;

export const triggerPayment = (
  orderId: string,
  amount: number,
  itemName: string,
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
  },
  callbacks?: {
    onCompleted?: (orderId: string) => void;
    onDismissed?: () => void;
    onError?: (error: string) => void;
  }
) => {
  if (!window.payhere) {
    alert("PayHere SDK not loaded. Please refresh the page.");
    return;
  }

  window.payhere.onCompleted = (id) => {
    callbacks?.onCompleted?.(id);
  };

  window.payhere.onDismissed = () => {
    callbacks?.onDismissed?.();
  };

  window.payhere.onError = (error) => {
    callbacks?.onError?.(error);
  };

  const payment = {
    sandbox: true,
    merchant_id: PAYHERE_MERCHANT_ID,
    return_url: window.location.origin + "/",
    cancel_url: window.location.origin + "/products",
    notify_url: NOTIFY_URL,
    order_id: orderId,
    items: itemName,
    amount: amount.toFixed(2),
    currency: "LKR",
    first_name: customerInfo?.firstName || "Customer",
    last_name: customerInfo?.lastName || "",
    email: customerInfo?.email || "",
    phone: customerInfo?.phone || "",
    address: customerInfo?.address || "",
    city: customerInfo?.city || "Colombo",
    country: "Sri Lanka",
  };

  window.payhere.startPayment(payment);
};
