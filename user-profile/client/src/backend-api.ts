import axios from 'axios';

import type { User } from '../../server/src/types/user';
import type { Group } from '../../server/src/types/group';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  validateStatus: (status) => [200, 204, 404].includes(status),
});

export async function getAllGroups(): Promise<Group[]> {
  const res = await api.get(`/groups`);
  return res.data.groups;
}

export async function getUsersInGroup(groupId: string): Promise<User[]> {
  const res = await api.get(`/groups/${groupId}/users`);
  return res.data.users;
}

export async function addUserToGroup(groupId: string, userId: string): Promise<void> {
  await api.put(`/groups/${groupId}/users/${userId}`);
}

export async function removeUserFromGroup(groupId: string, userId: string): Promise<void> {
  await api.delete(`/groups/${groupId}/users/${userId}`);
}

export async function getUserById(userId: string): Promise<User> {
  const res = await api.get(`/users/${userId}`);

  if (res.status === 404) {
    throw new Error(`User #${userId} is not found`);
  }

  return res.data;
}

export async function findUser(name?: string, email?: string): Promise<User | undefined> {
  const res = await api.get(`/users:find`, { params: { name, email } });

  if (res.status === 404) {
    return undefined;
  }

  return res.data;
}
