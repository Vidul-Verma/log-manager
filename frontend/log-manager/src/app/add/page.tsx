'use client';

import { API_ENDPOINTS } from '@/config/api';
import { useLogForm } from '../viewmodels/useLogForm';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { Log } from '../types/Log';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { withAuth } from '../hoc/withAuth';
import Header from '../components/Header';
import { useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

function AddLogPage() {
    useRequireAuth();
  const { form, errors, setForm, validate, reset } = useLogForm();
  const router = useRouter();
  const token = Cookies.get('token');
  const queryClient = useQueryClient()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const res = await fetchWithAuth<Log>(API_ENDPOINTS.LOGS_ADD, "POST", form, token);

    if (!res) {
      alert('Failed to create log.');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['logs'] });
    reset();
    router.push('/');
  }, [form, reset, router, token, validate, queryClient]) 

  return (
    <>
    <Header />
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Log</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm('description', e.target.value)}
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <DatePicker
  selected={form.eventDate ? dayjs(form.eventDate).toDate() : null}
  onChange={(date: Date | null) => setForm('eventDate', date ? dayjs(date).toISOString() : '')}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="yyyy-MM-dd HH:mm"
  className="w-full border p-2"
/>
{errors.eventDate && <p className="text-red-500">{errors.eventDate}</p>}

        {errors.eventDate && <p className="text-red-500">{errors.eventDate}</p>}

        <input
          className="w-full border p-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm('location', e.target.value)}
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Create Log
        </button>
      </form>
    </main>
    </>
  );
}

export default withAuth(AddLogPage);