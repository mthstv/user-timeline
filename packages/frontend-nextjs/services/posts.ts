'use server';

import { auth } from "@/lib/auth";
import { postsAPI } from "@/lib/axios";

export async function getAllPosts() {
  try {
    const session = await auth() as SessionUser;
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
    console.error(error)
  }
}

export async function getAuthPosts() {
  try {
    const session = await auth() as SessionUser;
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
    console.error(error)
  }
}

export async function getLikedPosts() {
  try {
    const session = await auth() as SessionUser;
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
    console.error(error)
  }
}

export async function likePost(
  { id }: UserPost
) {
  try {
    const session = await auth() as SessionUser;

    const { data } = await postsAPI.post('/posts/like', {
      postId: id
    }, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    })

    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function createPost(
  { content }: UserPost
) {
  try {
    const session = await auth() as SessionUser;

    const { data } = await postsAPI.post('/posts', {
      content
    }, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    })

    return data;
  } catch (error) {
    console.error(error)
  }
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
    console.error(error)
  }
}