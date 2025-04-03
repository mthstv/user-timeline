'use server';

import { auth, signIn } from '@/lib/auth';
import { authAPI } from '../lib/axios';
import { createProfile } from './profile';
import { toast } from 'sonner';

export const getUserSession = async () => {
  const session = await auth();
  return session;
}

export async function login(email?: string, password?: string) {
  try {
    const { data } = await authAPI.post('/auth/login', {
      email,
      password
    });
  
    console.log('data', data)
  
    if (data.error) {
      toast.error(data.error);
    }
  
    return data;
  } catch (error) {
    console.error(error)
  };
}

export async function register({email, password, username, displayName}: SignupDto) {
  try {
    const { data } = await authAPI.post('/auth/signup', {
      email,
      password,
    });

    const { data: profileData} = await createProfile({ username, displayName, accessToken: data.access_token });

    if (data.error) {
      toast.error(data.error);
    }

    return { ...data, ...profileData };
  } catch (error) {
    console.error(error)
  };
}

export const handleSignIn = async ({ email, password }: { email?: string; password?: string }) => {
  await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
}

export async function removeAuthUser() {
  try {
    const session = await auth() as SessionUser;

    const { data } = await authAPI.delete('/auth', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });

    if (data.error) {
      toast.error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error(error)
  }
}