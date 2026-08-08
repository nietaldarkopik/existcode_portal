export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  data: AdminUser;
  token: string;
}
