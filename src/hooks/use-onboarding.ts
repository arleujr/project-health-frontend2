
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export type PrimaryGoal =
  | 'WEIGHT_LOSS'
  | 'MUSCLE_GAIN'
  | 'HEALTH'
  | 'PERFORMANCE';

export interface BasicProfileData {
  name: string;
  goal: PrimaryGoal | '';
  restriction: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export function useOnboarding() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitProgressiveProfile = async (
    data: BasicProfileData,
  ): Promise<boolean> => {
    if (!data.name.trim() || !data.goal) {
      setError(
        'Preencha seu nome e selecione seu objetivo principal.',
      );

      return false;
    }

    if (!data.termsAccepted || !data.privacyAccepted) {
      setError(
        'Você precisa aceitar os termos e a política de privacidade.',
      );

      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      await api.patch(
        '/v1/onboarding/basic-profile',
        {
          name: data.name.trim(),
          goal: data.goal,
          restriction: data.restriction.trim(),
          termsAccepted: data.termsAccepted,
          privacyAccepted: data.privacyAccepted,
        },
      );

      router.replace('/dashboard');
      router.refresh();

      return true;
    } catch (caughtError: unknown) {
      console.error(
        'Falha ao concluir perfil básico:',
        caughtError,
      );

      if (axios.isAxiosError(caughtError)) {
        setError(
          caughtError.response?.data?.message ??
            'Não foi possível salvar seu perfil.',
        );
      } else {
        setError('Ocorreu um erro inesperado.');
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitProgressiveProfile,
    isLoading,
    error,
    setError,
  };
}
