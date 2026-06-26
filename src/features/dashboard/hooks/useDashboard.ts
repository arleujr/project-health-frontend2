import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { dashboardService } from '../services/dashboard.service';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardData,

    staleTime: 60_000,
    refetchOnWindowFocus: false,

    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Não repete requisições quando o problema
        // é autenticação ou falta de permissão.
        if (status === 401 || status === 403) {
          return false;
        }
      }

      return failureCount < 1;
    },
  });
}