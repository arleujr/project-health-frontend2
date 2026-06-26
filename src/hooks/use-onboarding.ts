'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface OnboardingData {
  name: string;
  goal: string;
  restriction: string;
}

export function useOnboarding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitProgressiveProfile = async (data: OnboardingData) => {
    // 🛡️ Early Return: Validação rápida antes de bater no servidor
    if (!data.name.trim() || !data.goal) {
      setError('Por favor, preencha seu nome e o objetivo principal.');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 🚀 Chamada Stateless com JWT (via interceptor configurado no pi-client)
      // No MVP, se a rota ainda não existir no backend, o catch vai segurar com graciosidade.
      await api.post('/v1/patients/onboarding', data);

      // Sucesso! Redireciona para o Dashboard/Painel do Cliente
      router.push('/dashboard');
      return true;

    } catch (err: unknown) {
      // 🛡️ Graceful Degradation: Captura o erro sem quebrar a tela
      console.error('Falha no Onboarding:', err);
      setError(axios.isAxiosError(err) ? (err.response?.data?.message ?? 'Ocorreu um erro ao salvar seus dados. Tente novamente.') : 'Ocorreu um erro ao salvar seus dados. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitProgressiveProfile,
    isLoading,
    error,
    setError // Exportado caso a UI precise limpar o erro ao digitar
  };
}