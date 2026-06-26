'use client';

import { useState, useEffect } from 'react';

export interface PatientSummary {
  id: string;
  name: string;
  goal: string;
  onboardingDate: string;
  status: 'GREEN' | 'YELLOW' | 'RED';
  restrictionAlert?: string | null;
}

export function useProfessionalDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // 🎭 SMOKE AND MIRRORS: Dados perfeitamente ensaiados para o MVP
  const mockPatients: PatientSummary[] = [
    {
      id: 'mock-1',
      name: 'Carlos Silva (Novo)',
      goal: 'Hipertrofia',
      onboardingDate: 'Hoje, 09:15',
      status: 'RED',
      restrictionAlert: 'Dor aguda no joelho direito ao tentar agachar'
    },
    {
      id: 'mock-2',
      name: 'Ana Laura',
      goal: 'Emagrecimento',
      onboardingDate: 'Hoje, 08:30',
      status: 'YELLOW',
    },
    {
      id: 'mock-3',
      name: 'Roberto Mendes',
      goal: 'Performance Esportiva',
      onboardingDate: 'Ontem',
      status: 'GREEN',
    }
  ];

  useEffect(() => {
    // Simula o tempo de carregamento da rede (Skeletons vão aparecer por 1 segundo)
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    patients: mockPatients,
    isLoading,
    isError: false,
    // Métricas maquiadas para dar volume ao seu negócio na apresentação
    metrics: {
      total: 142,
      alerts: 1,
      pending: 12,
    }
  };
}