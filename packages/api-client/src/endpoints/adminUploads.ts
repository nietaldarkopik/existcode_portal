import type { AxiosInstance } from "axios";

export function uploadAdminImage(client: AxiosInstance, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  return client
    .post<{ url: string }>("/admin/uploads/image", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => res.data);
}
