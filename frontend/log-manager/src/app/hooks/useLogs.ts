'use client';
import { useEffect, useState } from "react";
import { AsyncData } from "../types/async";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "@/config/api";
import { PaginatedLogs, paginatedLogsSchema } from "../types/PaginatedLogs";

// Replace string with type and schema definition for logs
export const useLogs = (page: number, limit: number = 10) : AsyncData<PaginatedLogs> => {
    const [state, setState] = useState<AsyncData<PaginatedLogs>>({
        data: null,
        loading: true,
        error: null,
      });
    
      const token = Cookies.get("token")

      useEffect(() => {
        fetchWithAuth<PaginatedLogs>(`${API_ENDPOINTS.LOGS}?page=${page}&limit=${limit}`, "GET", undefined, token)
          .then((json) => {
            const parsed = paginatedLogsSchema.safeParse(json);

        if (!parsed.success) {
          setState({
            data: null,
            loading: false,
            error: 'Invalid response format',
          });
        } else {
          setState({
            data: parsed.data,
            loading: false,
            error: null,
          });
        }
          })
          .catch((err) => setState({ data: null, loading: false, error: err.message }));
      }, [limit, page, token]);
    
    
      return state;
}