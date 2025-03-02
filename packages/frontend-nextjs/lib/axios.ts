import axios from 'axios';

export const api = axios.create({
  baseURL: "/api"
})

export const authAPI = axios.create({
  baseURL: process.env.NEXT_AUTH_API_URL
})

export const postsAPI = axios.create({
  baseURL: process.env.NEXT_POSTS_API_URL
})

export const profilesAPI = axios.create({
  baseURL: process.env.NEXT_PROFILES_API_URL
})