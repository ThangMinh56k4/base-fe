import type { KyInstance } from 'ky';

import type { User, RegisterPayload, LoginResponse, LoginCredentials } from '@/types';

export default class AuthService {
  constructor(protected $ky: KyInstance, protected endPoint: string) {}

  async register(payload: RegisterPayload) {
    const response = (await this.$ky
      .post(`${this.endPoint}/register`, { json: payload })
      .json<User>()
      .catch(() => null)) as User | null;

    return response;
  }

  async login(payload: LoginCredentials) {
    const response = (await this.$ky
      .post(`${this.endPoint}/login`, { json: payload })
      .json<LoginResponse>()
      .catch(() => null)) as LoginResponse | null;

    return response;
  }

  async me() {
    const response = (await this.$ky
      .get(`${this.endPoint}`)
      .json<User>()
      .catch(() => null)) as User | null;

    return response;
  }

  async forgotPassword(email: string, redirectUrl: string) {
    const response = (await this.$ky
      .post(`${this.endPoint}/forgot-password`, { json: { email, redirectUrl } })
      .json<{ message: string }>()
      .catch(() => null)) as { message: string } | null;

    return response;
  }

  async resetPassword(token: string, password: string) {
    const response = (await this.$ky
      .post(`${this.endPoint}/reset-password`, { json: { token, password } })
      .json<{ message: string }>()
      .catch(() => null)) as { message: string } | null;

    return response;
  }

  async loginWithFacebook(accessToken: string) {
    const response = (await this.$ky
      .post(`${this.endPoint}/facebook`, {
        json: { accessToken }
      })
      .json<LoginResponse>()
      .catch(() => null)) as LoginResponse | null;

    return response;
  }

  async loginWithGoogle(accessToken: string) {
    const response = (await this.$ky
      .post(`${this.endPoint}/google`, {
        json: { accessToken }
      })
      .json<LoginResponse>()
      .catch(() => null)) as LoginResponse | null;

    return response;
  }
}
