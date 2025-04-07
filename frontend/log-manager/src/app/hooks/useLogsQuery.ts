import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { paginatedLogsSchema, PaginatedLogs } from '../types/PaginatedLogs';
import { API_ENDPOINTS } from '@/config/api';

export function useLogsQuery(page: number, limit = 10, token?:string) {
  return useQuery<PaginatedLogs>({
    queryKey: ['logs', page],
    queryFn: async () => {
      const data = await fetchWithAuth<PaginatedLogs>(`${API_ENDPOINTS.LOGS}?page=${page}&limit=${limit}`, "GET", undefined, token)
      const parsed = paginatedLogsSchema.safeParse(data);

      if (!parsed.success) throw new Error('Invalid response format');
      return parsed.data;
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}