'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export interface AnamnesisData {
  height: string;
  weight: string;
  bodyFat: string;
  medicalConditions: string;
  medications: string;
  routine: string;
}

export function useClinicalAnamnesis() {
  const router = useRouter();

  const [currentStep, setCurrentStep] =
    useState(1);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const totalSteps = 3;

  const [formData, setFormData] =
    useState<AnamnesisData>({
      height: '',
      weight: '',
      bodyFat: '',
      medicalConditions: '',
      medications: '',
      routine: '',
    });

  const nextStep = () => {
    setCurrentStep((previous) =>
      Math.min(previous + 1, totalSteps),
    );
  };

  const prevStep = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1),
    );
  };

  const updateField = (
    field: keyof AnamnesisData,
    value: string,
  ) => {
    setError(null);

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const submitAnamnesis = async () => {
    if (!formData.height || !formData.weight) {
      setError(
        'Informe pelo menos seu peso e sua altura.',
      );

      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      await api.post(
        '/v1/onboarding/anamnesis',
        {
          height: formData.height,
          weight: formData.weight,
          bodyFat: formData.bodyFat,
          medicalConditions:
            formData.medicalConditions.trim(),
          medications:
            formData.medications.trim(),
          routine: formData.routine.trim(),
        },
      );

      router.replace('/dashboard');
      router.refresh();

      return true;
    } catch (caughtError: unknown) {
      console.error(
        'Erro ao salvar anamnese:',
        caughtError,
      );

      if (axios.isAxiosError(caughtError)) {
        setError(
          caughtError.response?.data?.message ??
            'Não foi possível salvar a anamnese.',
        );
      } else {
        setError(
          'Ocorreu um erro inesperado ao salvar a anamnese.',
        );
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    isLoading,
    error,
    nextStep,
    prevStep,
    updateField,
    submitAnamnesis,
  };
}