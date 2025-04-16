import type { PagingResponse } from '@/types';

export const getEmptyPagingResponse = <T>() => {
  const response = {
    data: [],
    pagination: {
      page: 0,
      limit: 0,
      totalPages: 0
    }
  } as PagingResponse<T>;

  return response;
};
