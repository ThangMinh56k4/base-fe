import type { KyInstance } from 'ky';

import type { PaginationParams, PagingResponse } from '@/types';

export default class RestService<T = any> {
  constructor(protected $ky: KyInstance, protected endPoint: string) {}

  index(searchParams?: PaginationParams) {
    return this.$ky.get(this.endPoint, { searchParams }).json<PagingResponse<T>>().catch(getEmptyPagingResponse);
  }

  create<R = T>(data: Partial<T>) {
    return this.$ky
      .post(this.endPoint, { json: data })
      .json<R>()
      .catch(() => null);
  }
}
