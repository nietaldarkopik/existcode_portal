import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { deleteAdminBlogPost, getAdminBlogPosts } from "@existcode/api-client";
import { apiClient } from "../../app/apiClient";

export function BlogListPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "blog-posts"], queryFn: () => getAdminBlogPosts(apiClient) });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminBlogPost(apiClient, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] })
  });

  function handleDelete(id: number, title: string) {
    if (confirm(`Hapus artikel "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-neutral-50">Blog</h1>
          <p className="mt-1 text-sm text-neutral-400">Kelola artikel blog.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/blog/kategori"
            className="flex h-10 items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-300 hover:border-neutral-500"
          >
            <Settings2 className="size-4" /> Kategori
          </Link>
          <Link
            to="/blog/baru"
            className="flex h-10 items-center gap-2 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300"
          >
            <Plus className="size-4" /> Tambah Artikel
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Judul</TableHeaderCell>
              <TableHeaderCell>Kategori</TableHeaderCell>
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
                <TableCell colSpan={4}>Belum ada artikel.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-neutral-50">{post.title.id}</TableCell>
                  <TableCell>{post.category?.name.id ?? "-"}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "success" : "neutral"}>{post.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/blog/${post.id}`}
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
