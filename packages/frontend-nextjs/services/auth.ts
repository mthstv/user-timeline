'use server';

import { auth, signIn } from '@/lib/auth';
import { authAPI } from '../lib/axios';
import { createProfile } from './profile';

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

export async function register({email, password, username, displayName}: SignupDto) {
  const { data } = await authAPI.post('/auth/signup', {
    email,
    password,
  });

  const { data: profileData} = await createProfile({ username, displayName, accessToken: data.access_token });

  if (data.error) {
    throw new Error(data.error);
  }

  return { ...data, ...profileData };
}

export const handleSignIn = async ({ email, password }: { email?: string; password?: string }) => {
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/feed',
    redirect: true,
  });
}
