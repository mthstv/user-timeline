'use server';

import { auth } from "@/lib/auth";
import { profilesAPI } from "@/lib/axios";

export async function getProfile() {
  const session = await auth();

  const { data } = await profilesAPI.get(`/profiles/auth`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function createProfile(
  { username, displayName }: UserProfile
) {
  const session = await auth();

  const { data } = await profilesAPI.post('/profiles', {
    username,
    displayName
  }, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  return data;
}


export async function updateProfile(
  { username, displayName, bio, avatar }: UserProfile
) {
  const session = await auth();

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