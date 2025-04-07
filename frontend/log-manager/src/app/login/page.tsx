'use client';

import { useState } from 'react';
import { useAuthActions } from '../hooks/useAuthActions';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const { handleAuth } = useAuthActions();

  const toggleMode = () => setIsRegistering((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleAuth(form, isRegistering);
    } catch (err: unknown) {
      alert(err || 'Authentication failed');
    }
  };

  return (
    <main className="max-w-sm mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isRegistering ? 'Register' : 'Login'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className="border w-full p-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-500">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleMode} className="text-blue-600 underline">
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </main>
  );
}