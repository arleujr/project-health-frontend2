'use client';

import { useState } from 'react';
import axios from 'axios';

import { api } from '@/lib/api';

export interface CreatePatientInput {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export function useCreatePatient() {
  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const createPatient = async (
    input: CreatePatientInput,
  ): Promise<boolean> => {
    if (!input.name.trim()) {
      setError('Informe o nome do paciente.');
      return false;
    }

    if (!input.email.trim()) {
      setError('Informe o e-mail do paciente.');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const response = await api.post(
        '/v1/onboarding/access-grants/manual',
        {
          name: input.name.trim(),
          email: input.email
            .trim()
            .toLowerCase(),

          phone:
            input.phone.trim() || undefined,

          cpf:
            input.cpf.trim() || undefined,
        },
      );

      setSuccess(
        response.data?.message ??
          'Acesso do paciente liberado com sucesso.',
      );

      return true;
    } catch (caughtError: unknown) {
      console.error(
        'Erro ao liberar acesso do paciente:',
        caughtError,
      );

      if (axios.isAxiosError(caughtError)) {
        setError(
          caughtError.response?.data?.message ??
            'Não foi possível cadastrar o paciente.',
        );
      } else {
        setError(
          'Ocorreu um erro inesperado ao cadastrar o paciente.',
        );
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    createPatient,
    isLoading,
    error,
    success,
    setError,
    clearMessages,
  };
}

