import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { getAdminOrders } from "@existcode/api-client";
import type { OrderStatus } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { formatCurrency, formatDate } from "../../lib/format";

const statusVariant: Record<OrderStatus, "neutral" | "success" | "warning" | "info" | "danger"> = {
  pending_payment: "warning",
  paid: "success",
  in_progress: "info",
  completed: "success",
  cancelled: "danger"
};

const statusLabel: Record<OrderStatus, string> = {
  pending_payment: "Menunggu Bayar",
  paid: "Lunas",
  in_progress: "Dikerjakan",
  completed: "Selesai",
  cancelled: "Batal"
};

export function OrdersListPage() {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "orders"], queryFn: () => getAdminOrders(apiClient) });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">Order</h1>
      <p className="mt-1 text-sm text-neutral-400">Daftar pesanan yang masuk dari website.</p>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nomor Pesanan</TableHeaderCell>
              <TableHeaderCell>Pelanggan</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Tanggal</TableHeaderCell>
              <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>Memuat...</TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>Belum ada pesanan.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-neutral-50">{order.order_number}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{formatCurrency(order.total_amount, order.currency)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                    >
                      <Eye className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
