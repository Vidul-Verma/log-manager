'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useRequireAuth(): boolean | null {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // 🔁 Redirect to login if token is missing
      router.replace('/login');
    } else {
      setAuthenticated(true); 
    }
  }, []);

  return isAuthenticated;
}