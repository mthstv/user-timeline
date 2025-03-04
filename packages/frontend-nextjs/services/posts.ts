'use server';

import { auth } from "@/lib/auth";
import { postsAPI } from "@/lib/axios";

export async function getAllPosts() {
  const session = await auth() as SessionUser;
  try {
    const { data } = await postsAPI.get(`/posts`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAuthPosts() {
  const session = await auth() as SessionUser;
  try {
    const { data } = await postsAPI.get(`/posts/user/auth`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });
  
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getLikedPosts() {
  const session = await auth() as SessionUser;
  try {
    const { data } = await postsAPI.get(`/posts/liked/auth`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });
  
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function likePost(
  { id }: UserPost
) {
  const session = await auth() as SessionUser;

  const { data } = await postsAPI.post('/posts/like', {
    postId: id
  }, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  return data;
}

export async function createPost(
  { content }: UserPost
) {
  const session = await auth() as SessionUser;

  const { data } = await postsAPI.post('/posts', {
    content
  }, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  return data;
}


export async function removeAuthPosts() {
  try {
    const session = await auth() as SessionUser;

    const { data } = await postsAPI.delete('/posts/user/auth', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });

    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}