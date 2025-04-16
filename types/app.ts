import type { LOAD_MORE_STATUS } from '@/config';

export type SnackbarOptions = {
  visibleIcon: boolean;
  timeout: number;
  location: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'start' | 'end';
  position: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky';
  minWidth: number;
  minHeight: number;
};

export enum LoginStrategy {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
}

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type NuxtAppAuth = {
  loggedIn: Ref<boolean>;
  loginWith: (strategy: LoginStrategy, credentials?: LoginCredentials) => Promise<boolean>;
  logout: (redirectPath?: string) => void;
  token: Ref<string | null | undefined>;
  setAuth: (accessToken: string | null) => Promise<void>;
};

export type AppDataError = {
  icon?: string;
};

export type AppError = {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: AppDataError;
};

export type FacebookLoginResponse = {
  authResponse: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
  status: string;
};

export type KeyOfLoadMoreStatus = keyof typeof LOAD_MORE_STATUS;
export type LoadMoreStatus = (typeof LOAD_MORE_STATUS)[KeyOfLoadMoreStatus];
export type LoadMoreSide = 'start' | 'end' | 'both';

export type LoadMoreProps = {
  side: LoadMoreSide;
  done: (status: LoadMoreStatus) => void;
};
