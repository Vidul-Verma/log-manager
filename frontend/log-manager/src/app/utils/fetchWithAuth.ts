import Cookies from 'js-cookie';

export async function fetchWithAuth<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
  token?: string | null
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // 🧠 Read token from cookies if not provided
  if (!token && typeof window !== 'undefined') {
    token = Cookies.get('token') || '';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined && method !== 'DELETE') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(path, options);


  // const response = await fetch(path, {
  //   method,
  //   headers,
  //   ...(body ? { body: JSON.stringify(body) } : {}),
  // });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || 'Request failed');
  }

  return response.json();
}