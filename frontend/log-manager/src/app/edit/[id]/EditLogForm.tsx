'use client';

import { useRouter } from 'next/navigation';
import { useLogForm } from '../../viewmodels/useLogForm';
import { Log } from '../../types/Log';
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { withAuth } from '@/app/hoc/withAuth';
import { useQueryClient } from '@tanstack/react-query';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


function EditLogForm({ initialLog }: { initialLog: Log }) {
  const router = useRouter();

  const {
    form,
    setForm,
    errors,
    validate,
    reset,
    setInitialForm
  } = useLogForm();

  useEffect(() => {
    setInitialForm(initialLog);
  }, [setInitialForm, initialLog]);

  const token = Cookies.get('token');
  const queryClient = useQueryClient()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!form._id) {
        return;
    }
    
    const res = await fetchWithAuth<Log>(API_ENDPOINTS.LOGBYID(form._id), "PUT", form, token);

    if (!res) {
      alert('Failed to update log.');
      return;
    }

    reset();
    queryClient.invalidateQueries({ queryKey: ['logs'] });
    router.push('/');

  }, [form, validate, reset, router, token, queryClient]); 

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Log</h1>
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
        {/* <input
          type="datetime-local"
          className="w-full border p-2"
          value={dayjs(form.eventDate).format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => setForm('eventDate', e.target.value)}
        /> */}
        {errors.eventDate && <p className="text-red-500">{errors.eventDate}</p>}

        <input
          className="w-full border p-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm('location', e.target.value)}
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Update Log
        </button>
      </form>
    </main>
  );
}

export default withAuth(EditLogForm);