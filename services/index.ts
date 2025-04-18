import type { KyInstance } from 'ky';

import AuthServices from './AuthService';
import RestService from './RestService';
import StreetMapService from './StreetMapService';

import type { Message } from '@/types';

const initApiServices = (ky: KyInstance) => {
  return {
    auth: new AuthServices(ky, 'auth'),
    message: new RestService<Message>(ky, 'message'),
    streetMap: new StreetMapService(),
  };
};

export type ApiServices = ReturnType<typeof initApiServices>;

export default initApiServices;
