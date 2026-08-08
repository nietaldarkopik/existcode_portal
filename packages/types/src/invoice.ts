import type { Order } from "./order";
import type { Payment } from "./payment";

export type InvoiceStatus = "unpaid" | "paid" | "expired" | "cancelled";

export interface PaymentInstructions {
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  status: InvoiceStatus;
  currency: string;
  amount_due: string;
  due_at: string | null;
  paid_at: string | null;
  payment_instructions: PaymentInstructions | null;
  order: Order | null;
  payments: Payment[];
}
