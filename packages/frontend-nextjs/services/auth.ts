'use server';

import { auth, signIn } from '@/lib/auth';
import { authAPI } from '../lib/axios';
import { profilesAPI } from '../lib/axios';

export const getUserSession = async () => {
  const session = await auth();
  return session;
}

export async function login(email?: string, password?: string) {
  const { data } = await authAPI.post('/auth/login', {
    email,
    password
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function getProfile(accessToken: string) {
  // const session = await auth();
  const { data } = await profilesAPI.get(`/profiles/auth`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function register({email, password, username, displayName}: SignupDto) {
  const { data } = await authAPI.post('/auth/signup', {
    email,
    password,
    username,
    displayName
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export const handleSignIn = async ({ email, password }: { email?: string; password?: string }) => {
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/feed',
    redirect: true,
  });
}
