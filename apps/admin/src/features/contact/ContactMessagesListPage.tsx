import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Badge, Modal, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@existcode/ui";
import { getAdminContactMessages, updateAdminContactMessageStatus } from "@existcode/api-client";
import type { ContactMessage, ContactMessageStatus } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { formatDate } from "../../lib/format";

const statusVariant: Record<ContactMessageStatus, "warning" | "info" | "neutral"> = {
  new: "warning",
  read: "info",
  archived: "neutral"
};

const statusLabel: Record<ContactMessageStatus, string> = {
  new: "Baru",
  read: "Dibaca",
  archived: "Diarsipkan"
};

export function ContactMessagesListPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "contact-messages"],
    queryFn: () => getAdminContactMessages(apiClient)
  });

  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ContactMessageStatus }) =>
      updateAdminContactMessageStatus(apiClient, id, { status }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contact-messages"] });
      setSelected(res.data);
    }
  });

  function handleOpen(message: ContactMessage) {
    setSelected(message);
    if (message.status === "new") {
      updateMutation.mutate({ id: message.id, status: "read" });
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">Pesan Kontak</h1>
      <p className="mt-1 text-sm text-neutral-400">Pesan yang masuk dari formulir Kontak.</p>

      <div className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nama</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Subjek</TableHeaderCell>
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
                <TableCell colSpan={6}>Belum ada pesan.</TableCell>
              </TableRow>
            ) : (
              data?.data.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium text-neutral-50">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject ?? "-"}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[message.status]}>{statusLabel[message.status]}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(message.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => handleOpen(message)}
                      className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                    >
                      <Eye className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        title={selected?.subject || "Pesan dari " + (selected?.name ?? "")}
      >
        {selected ? (
          <div className="flex flex-col gap-3">
            <div className="text-sm text-neutral-400">
              <span className="text-neutral-200">{selected.name}</span> · {selected.email}
              {selected.phone ? <> · {selected.phone}</> : null}
            </div>
            <p className="whitespace-pre-wrap text-sm text-neutral-200">{selected.message}</p>

            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => updateMutation.mutate({ id: selected.id, status: "read" })}
                className="h-9 rounded-lg border border-neutral-700 px-3 text-xs text-neutral-300 hover:border-neutral-500"
              >
                Tandai Dibaca
              </button>
              <button
                type="button"
                onClick={() => updateMutation.mutate({ id: selected.id, status: "archived" })}
                className="h-9 rounded-lg border border-neutral-700 px-3 text-xs text-neutral-300 hover:border-neutral-500"
              >
                Arsipkan
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
