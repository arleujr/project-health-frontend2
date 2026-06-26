import { api } from '@/lib/api';

import type {
  DashboardData,
  DashboardMetrics,
  SessionUser,
} from '@/types/dashboard';

const emptyMetrics: DashboardMetrics = {
  totalActive: 0,
  riskCount: 0,
  averageHealthScore: 0,
  mrr: 0,
};

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    // Primeiro identifica o usuário autenticado.
    const userResponse = await api.get<SessionUser>(
      '/v1/auth/me',
    );

    const user = userResponse.data;

    // A rota /v1/plans/dashboard é exclusiva de profissionais.
    // Clientes recebem os dados básicos para renderizar PatientWidgets.
    if (user.role === 'CLIENT') {
      return {
        user,
        metrics: emptyMetrics,
        patients: [],
      };
    }

    // ADMIN, NUTRI, EFI e ASSISTANT podem acessar
    // o dashboard profissional.
    const dashboardResponse =
      await api.get<DashboardData>(
        '/v1/plans/dashboard',
      );

    return dashboardResponse.data;
  },
};