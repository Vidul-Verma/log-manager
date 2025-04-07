const BASE_API_URL =
  process.env.NEXT_PUBLIC_API_URL

export const API_ENDPOINTS = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  LOGS: `${BASE_API_URL}/logs`,
  LOGS_ADD: `${BASE_API_URL}/logs/add`,
  LOGIN: `${BASE_API_URL}/auth/login`,
  REGISTER: `${BASE_API_URL}/auth/register`,
  LOGBYID: (id: string) => `${BASE_API_URL}/logs/${id}`,

};

const BASE_API_URL_NODEAPP = 'http://nodeapp:4000'

export const API_ENDPOINTS_NODEAPP = {
    LOGBYID: (id: string) => `${BASE_API_URL_NODEAPP}/logs/${id}`,
}