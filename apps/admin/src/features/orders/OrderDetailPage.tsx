import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Alert, Badge, Select, Skeleton } from "@existcode/ui";
import { getAdminOrder, updateAdminOrderStatus } from "@existcode/api-client";
import type { OrderStatus } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { formatCurrency, formatDate } from "../../lib/format";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending_payment", label: "Menunggu Pembayaran" },
  { value: "paid", label: "Lunas" },
  { value: "in_progress", label: "Dikerjakan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" }
];

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "order", orderId],
    queryFn: () => getAdminOrder(apiClient, orderId)
  });

  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  const updateMutation = useMutation({
    mutationFn: (status: OrderStatus) => updateAdminOrderStatus(apiClient, orderId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      setPendingStatus(null);
    }
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full max-w-2xl" />;
  }

  const order = data?.data;

  if (!order) {
    return <Alert variant="danger">Pesanan tidak ditemukan.</Alert>;
  }

  const currentStatus = pendingStatus ?? order.status;

  return (
    <div className="max-w-2xl">
      <Link to="/orders" className="mb-4 flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200">
        <ArrowLeft className="size-4" /> Kembali ke daftar order
      </Link>

      <h1 className="font-heading text-2xl font-semibold text-neutral-50">{order.order_number}</h1>
      <p className="mt-1 text-sm text-neutral-400">Dibuat {formatDate(order.created_at)}</p>

      <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Pelanggan</p>
        <p className="mt-1 text-sm text-neutral-50">{order.customer_name}</p>
        <p className="text-sm text-neutral-400">{order.customer_email}</p>
        <p className="text-sm text-neutral-400">{order.customer_phone}</p>
        {order.customer_company ? <p className="text-sm text-neutral-400">{order.customer_company}</p> : null}
        {order.notes ? (
          <>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Catatan</p>
            <p className="mt-1 text-sm text-neutral-300">{order.notes}</p>
          </>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Item Pesanan</p>
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-neutral-800 py-2 last:border-b-0">
            <span className="text-sm text-neutral-300">{item.item_name}</span>
            <span className="text-sm text-neutral-400">{formatCurrency(item.unit_price, order.currency)}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between pt-2">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Total</span>
          <span className="font-heading text-lg font-semibold text-neutral-50">
            {formatCurrency(order.total_amount, order.currency)}
          </span>
        </div>
      </div>

      {order.invoice ? (
        <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Invoice</p>
            <Badge variant={order.invoice.status === "paid" ? "success" : "warning"}>{order.invoice.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-neutral-300">{order.invoice.invoice_number}</p>
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Ubah Status Pesanan</p>
        {updateMutation.isError ? (
          <Alert variant="danger" className="mb-3">
            Gagal mengubah status.
          </Alert>
        ) : null}
        <div className="flex items-center gap-3">
          <Select
            value={currentStatus}
            onValueChange={(value) => setPendingStatus(value as OrderStatus)}
            options={statusOptions}
            className="max-w-xs"
          />
          <button
            type="button"
            disabled={pendingStatus === null || updateMutation.isPending}
            onClick={() => pendingStatus && updateMutation.mutate(pendingStatus)}
            className="h-10 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300 disabled:opacity-50"
          >
            {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
