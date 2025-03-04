'use server';

import { auth } from "@/lib/auth";
import { profilesAPI } from "@/lib/axios";

export async function getProfile() {
  const session = await auth() as SessionUser;

  const { data } = await profilesAPI.get(`/profiles/auth`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  if (data.error) {
    throw new Error(data.error);
  }

  const initials = data.displayName
    ?.split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('');


  return {...data, initials};
}

export async function getProfileByUser(userId?: string) {
  if (!userId) return;
  const session = await auth() as SessionUser;

  const { data } = await profilesAPI.get(`/profiles/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  if (data.error) {
    throw new Error(data.error);
  }

  const initials = data.displayName
    ?.split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('');


  return {...data, initials};
}


export async function createProfile(
  { username, displayName, accessToken }: UserProfile & { accessToken: string }
) {
  const session = await auth() as SessionUser;

  const { data } = await profilesAPI.post('/profiles', {
    username,
    displayName
  }, {
    headers: {
      Authorization: `Bearer ${accessToken || session?.accessToken}`
    }
  })

  return data;
}


export async function updateProfile(
  { username, displayName, bio, avatar }: UserProfile
) {
  const session = await auth() as SessionUser;

  const { data } = await profilesAPI.patch('/profiles', {
    username,
    displayName,
    bio,
    avatar,
  }, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  return data;
}