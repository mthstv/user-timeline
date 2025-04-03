import axios from 'axios';

export const authAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL
})

export const postsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL
})

export const profilesAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROFILES_API_URL
})