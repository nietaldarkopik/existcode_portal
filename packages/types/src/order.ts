import type { Invoice } from "./invoice";

export type OrderStatus = "pending_payment" | "paid" | "in_progress" | "completed" | "cancelled";

export interface OrderItem {
  id: number;
  item_name: string;
  item_description: string | null;
  unit_price: string;
  quantity: number;
  line_total: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company: string | null;
  notes: string | null;
  status: OrderStatus;
  currency: string;
  subtotal_amount: string;
  discount_amount: string;
  tax_amount: string;
  total_amount: string;
  created_at: string;
  items: OrderItem[];
  invoice: Invoice | null;
}

export interface CreateOrderPayload {
  pricing_plan_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company?: string;
  notes?: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}
