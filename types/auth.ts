export type User = {
  id: number
  email: string
  name: string
  roles: string
  token: string
  color: string
  picture: string
};

export type RegisterPayload = {
  email: string
  password: string
  name: string
};

export type LoginResponse = {
  token: string
};
