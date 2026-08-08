export type ContactMessageStatus = "new" | "read" | "archived";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
}

export interface CreateContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface UpdateContactMessageStatusPayload {
  status: ContactMessageStatus;
}
