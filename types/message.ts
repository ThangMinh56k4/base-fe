import type { User } from './auth';

export type Message = {
  id: string
  content: string
  createdAt: Date
  sender: User
};
