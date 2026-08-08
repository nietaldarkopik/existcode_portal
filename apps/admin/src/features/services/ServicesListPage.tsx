import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { deleteAdminService, getAdminServices } from "@existcode/api-client";
import { apiClient } from "../../app/apiClient";

export function ServicesListPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "services"], queryFn: () => getAdminServices(apiClient) });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminService(apiClient, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "services"] })
  });

  function handleDelete(id: number, name: string) {
    if (confirm(`Hapus jasa "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  }

  function labelOf(translated: { id: string }): string {
    return translated.id;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-50">Jasa</h1>
          <p className="mt-1 text-sm text-neutral-400">Kelola daftar layanan yang ditampilkan di halaman Jasa.</p>
        </div>
        <Link
          to="/jasa/baru"
          className="flex h-10 items-center gap-2 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300"
        >
          <Plus className="size-4" /> Tambah Jasa
        </Link>
      </div>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nama</TableHeaderCell>
              <TableHeaderCell>Kategori</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Unggulan</TableHeaderCell>
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
                <TableCell colSpan={5}>Belum ada jasa.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium text-neutral-50">{labelOf(service.name)}</TableCell>
                  <TableCell>{labelOf(service.category)}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === "published" ? "success" : "neutral"}>{service.status}</Badge>
                  </TableCell>
                  <TableCell>{service.is_featured ? "Ya" : "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/jasa/${service.id}`}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(service.id, labelOf(service.name))}
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
