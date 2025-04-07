'use client';

import { useCallback, useEffect, useState } from 'react';
import LogCard from './components/LogCard';
import Link from 'next/link';
import { fetchWithAuth } from './utils/fetchWithAuth';
import { API_ENDPOINTS } from '@/config/api';
import Cookies from 'js-cookie';
import { useLogsQuery } from './hooks/useLogsQuery';
import { useQueryClient } from '@tanstack/react-query';
import { withAuth } from './hoc/withAuth';
import Header from './components/Header';

function HomePage() {

  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const token = Cookies.get('token');
  const { data, isLoading, isError, error } = useLogsQuery(page, undefined ,token);
  const logs = data?.logs || [];

  useEffect(() => {
    if (token) {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    }
  }, [token, queryClient]);

  const handleDelete = useCallback(async(id?: string) => {
        if (!id) return;
        try {
          const res = await fetchWithAuth<unknown>(API_ENDPOINTS.LOGBYID(id), "DELETE", token);
        queryClient.invalidateQueries({ queryKey: ['logs'] });
        if (!res) {
          alert('Failed to delete log');
          return;
        }
        } catch(error) {
          console.error('Error deleting log:', error);
          alert('Failed to delete log');
          return;
        }
        
  }, [queryClient, token])

  return (
    <>
    <Header />
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/add"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Log
        </Link>
      </div>

      {isLoading && <p>Loading logs...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* ✅ Log Cards */}
        {logs.length === 0 && <p className="text-gray-500">No logs found.</p>}
        {logs.map((log) => (
          <LogCard
            key={log._id}
            log={log}
            onDelete={async () => await handleDelete(log._id)}
          />
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-white">
          Page {data?.currentPage} of {data?.totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.hasNextPage}
          className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
    </>
  );
}

export default withAuth(HomePage)