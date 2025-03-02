'use server';

import { authAPI } from '../lib/axios';

export async function getAuthUser(email: string, password: string) {
  const { data } = await authAPI.post('/auth/login', {
    email,
    password
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}