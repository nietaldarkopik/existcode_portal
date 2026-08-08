import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { deleteAdminNewsPost, getAdminNewsPosts } from "@existcode/api-client";
import { apiClient } from "../../app/apiClient";

export function NewsListPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "news-posts"], queryFn: () => getAdminNewsPosts(apiClient) });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminNewsPost(apiClient, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "news-posts"] })
  });

  function handleDelete(id: number, title: string) {
    if (confirm(`Hapus berita "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-50">News</h1>
          <p className="mt-1 text-sm text-neutral-400">Kelola berita/pengumuman perusahaan.</p>
        </div>
        <Link
          to="/news/baru"
          className="flex h-10 items-center gap-2 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300"
        >
          <Plus className="size-4" /> Tambah Berita
        </Link>
      </div>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Judul</TableHeaderCell>
              <TableHeaderCell>Tipe</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>Memuat...</TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>Belum ada berita.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-neutral-50">{post.title.id}</TableCell>
                  <TableCell>{post.news_type}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "success" : "neutral"}>{post.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/news/${post.id}`}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id, post.title.id)}
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
