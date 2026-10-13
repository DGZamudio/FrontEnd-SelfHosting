export enum SongStatus {
  pending = "pending",
  downloaded = "downloaded",
  error = "error"
}

export type PaginationType = {
  page      : number;
  page_size : number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}
