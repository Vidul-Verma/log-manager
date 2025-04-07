'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '../../config/api';

type AuthForm = {
  username: string;
  password: string;
};

export const useAuthActions = () => {
  const router = useRouter();

  const handleAuth = async (
    form: AuthForm,
    isRegistering: boolean
  ): Promise<void> => {
    const endpoint = isRegistering
      ? API_ENDPOINTS.REGISTER
      : API_ENDPOINTS.LOGIN;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Authentication failed');
    }

    if (data?.token) {
      Cookies.set('token', data.token, {
        path: '/',
        expires: 7,
      });

      router.push('/');
    }
  };

  return { handleAuth };
};