import type { AxiosInstance } from "axios";
import type { ApiResponse, ConfirmPaymentPayload, Invoice } from "@existcode/types";

export function getInvoiceByNumber(client: AxiosInstance, invoiceNumber: string) {
  return client.get<ApiResponse<Invoice>>(`/invoices/${encodeURIComponent(invoiceNumber)}`).then((res) => res.data);
}

export function confirmInvoicePayment(client: AxiosInstance, invoiceNumber: string, payload?: ConfirmPaymentPayload) {
  return client
    .post<ApiResponse<Invoice>>(`/invoices/${encodeURIComponent(invoiceNumber)}/confirm-payment`, payload ?? {})
    .then((res) => res.data);
}
