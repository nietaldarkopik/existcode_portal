import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { deleteAdminPricingPlan, getAdminPricingPlans } from "@existcode/api-client";
import { apiClient } from "../../app/apiClient";

export function PricingListPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "pricing-plans"],
    queryFn: () => getAdminPricingPlans(apiClient)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminPricingPlan(apiClient, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "pricing-plans"] })
  });

  function handleDelete(id: number, name: string) {
    if (confirm(`Hapus paket "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-50">Harga</h1>
          <p className="mt-1 text-sm text-neutral-400">Kelola paket harga yang ditampilkan di halaman Harga.</p>
        </div>
        <Link
          to="/harga/baru"
          className="flex h-10 items-center gap-2 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300"
        >
          <Plus className="size-4" /> Tambah Paket
        </Link>
      </div>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nama</TableHeaderCell>
              <TableHeaderCell>Harga</TableHeaderCell>
              <TableHeaderCell>Populer</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Memuat...</TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>Belum ada paket.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium text-neutral-50">{plan.name.id}</TableCell>
                  <TableCell>{plan.price_amount ? `Rp ${Number(plan.price_amount).toLocaleString("id-ID")}` : "Custom"}</TableCell>
                  <TableCell>{plan.is_popular ? "Ya" : "-"}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "published" ? "success" : "neutral"}>{plan.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/harga/${plan.id}`}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(plan.id, plan.name.id)}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-danger-500/10 hover:text-danger-400"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
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
