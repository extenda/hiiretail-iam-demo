import axios from 'axios';

import type { User } from '../../server/src/types/user';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export async function getUserById(userId: string): Promise<User> {
  const res = await api.get(`/users/${userId}`);

  if (res.status === 404) {
    throw new Error(`User #${userId} is not found`);
  }

  return res.data;
}

export async function findUser(): Promise<User> {
  return 0 as never;
}

export async function bulkSearch(): Promise<User[]> {
  return 0 as never;
}
