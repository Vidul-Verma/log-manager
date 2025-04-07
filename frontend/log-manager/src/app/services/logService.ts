
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Replace string with Log type and schema
export async function fetchLogs(page: number = 1, token: string | null): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/logs?page=${page}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error('Failed to fetch logs');
  const data = await res.json();
  return data.logs;
}