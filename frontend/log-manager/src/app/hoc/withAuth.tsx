'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import React from 'react';

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>): React.FC<T> {
  const WithAuth: React.FC<T> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (isAuthenticated === null) {
      return <p className="p-4 text-gray-500">Checking auth...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}