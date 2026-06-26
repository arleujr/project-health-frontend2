import { api } from '@/lib/api';
import type { DashboardData } from '@/types/dashboard';
export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> { return (await api.get<DashboardData>('/v1/plans/dashboard')).data; },
};
