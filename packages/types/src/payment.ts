export type PaymentMethod = "bank_transfer" | "e_wallet" | "credit_card" | "other";
export type PaymentStatus = "pending" | "success" | "failed";

export interface Payment {
  id: number;
  method: PaymentMethod;
  provider: string | null;
  provider_reference: string | null;
  amount: string;
  status: PaymentStatus;
  confirmation_note: string | null;
  confirmed_at: string | null;
  paid_at: string | null;
}

export interface ConfirmPaymentPayload {
  confirmation_note?: string;
}
