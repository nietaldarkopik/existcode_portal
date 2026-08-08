import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmInvoicePayment, getInvoiceByNumber } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useInvoice(invoiceNumber: string | undefined) {
  return useQuery({
    queryKey: ["invoice", invoiceNumber],
    queryFn: () => getInvoiceByNumber(apiClient, invoiceNumber as string),
    enabled: Boolean(invoiceNumber)
  });
}

export function useConfirmPayment(invoiceNumber: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof confirmInvoicePayment>[2]) =>
      confirmInvoicePayment(apiClient, invoiceNumber as string, payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", invoiceNumber] });
      if (result.data.order) {
        queryClient.invalidateQueries({ queryKey: ["order", result.data.order.order_number] });
      }
    }
  });
}
