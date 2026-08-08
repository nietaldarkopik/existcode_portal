import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Input } from "@existcode/ui";
import { createAdminBlogCategory, deleteAdminBlogCategory, getAdminBlogCategories } from "@existcode/api-client";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { apiClient } from "../../app/apiClient";
import { LocaleTabBar, type AdminLocale } from "../../components/LocaleTabBar";

export function BlogCategoriesPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "blog-categories"],
    queryFn: () => getAdminBlogCategories(apiClient)
  });

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [name, setName] = useState({ id: "", en: "" });
  const [slug, setSlug] = useState({ id: "", en: "" });

  const createMutation = useMutation({
    mutationFn: () => createAdminBlogCategory(apiClient, { name, slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-categories"] });
      setName({ id: "", en: "" });
      setSlug({ id: "", en: "" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminBlogCategory(apiClient, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "blog-categories"] })
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createMutation.mutate();
  }

  return (
    <div className="max-w-2xl">
      <Link to="/blog" className="mb-4 flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200">
        <ArrowLeft className="size-4" /> Kembali ke Blog
      </Link>

      <h1 className="font-heading text-2xl font-semibold text-neutral-50">Kategori Blog</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <LocaleTabBar locale={locale} onChange={setLocale} />
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Nama ({locale.toUpperCase()})
            </label>
            <Input
              required
              value={name[locale]}
              onChange={(e) => setName({ ...name, [locale]: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Slug ({locale.toUpperCase()})
            </label>
            <Input
              required
              value={slug[locale]}
              onChange={(e) => setSlug({ ...slug, [locale]: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="h-10 rounded-lg bg-accent-500 px-4 text-sm font-semibold text-neutral-950 hover:bg-accent-300 disabled:opacity-50"
          >
            Tambah
          </button>
        </div>
      </form>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nama</TableHeaderCell>
              <TableHeaderCell>Slug</TableHeaderCell>
              <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Memuat...</TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>Belum ada kategori.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium text-neutral-50">{category.name.id}</TableCell>
                  <TableCell>{category.slug.id}</TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus kategori "${category.name.id}"?`)) {
                          deleteMutation.mutate(category.id);
                        }
                      }}
                      className="rounded-md p-1.5 text-neutral-400 hover:bg-danger-500/10 hover:text-danger-400"
                    >
                      <Trash2 className="size-4" />
                    </button>
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
