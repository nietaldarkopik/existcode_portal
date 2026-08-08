export interface ApiResponse<T> {
  data: T;
}

export interface ApiMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiCollection<T> {
  data: T[];
  meta: ApiMeta;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
