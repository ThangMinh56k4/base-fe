export type ApiPagination = {
  page: number;
  limit: number;
  totalPages: number;
};

export type PagingResponse<T> = {
  data: T[];
  pagination: ApiPagination;
};

export type PaginationParams = Partial<{
  page: number;
  limit: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}>;
