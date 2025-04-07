'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username || null);
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <header className="bg-black border-b shadow-sm mb-4">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-500">
          Log Manager
        </Link>

        <div className="flex items-center gap-4">
          {username && <span className="text-gray-700">👋 {username}</span>}
          <button
            onClick={handleLogout}
            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}