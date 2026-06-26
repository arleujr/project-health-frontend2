'use client';

import useSWR from 'swr';
import { api } from '@/lib/api';

interface ClientDashboardData {
  id: string;
  name: string;
  goal: string;
  anamnesisStatus: 'PENDING' | 'COMPLETED'; // O controle do Progressive Profiling
  unlockedContents: {
    id: string;
    title: string;
    type: 'VIDEO' | 'PDF';
    url: string;
  }[];
}

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useClientDashboard() {
  // Busca os dados do próprio usuário logado (o token JWT no cookie já identifica quem é)
  const { data, error, isLoading } = useSWR<ClientDashboardData>('/v1/me/dashboard', fetcher);

  return {
    dashboardData: data,
    isLoading,
    isError: error,
    // Helper para a UI saber se deve cobrar a anamnese avançada
    needsClinicalAnamnesis: data?.anamnesisStatus === 'PENDING'
  };
}