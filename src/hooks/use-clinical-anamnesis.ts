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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AnamnesisData>({
    height: '',
    weight: '',
    bodyFat: '',
    medicalConditions: '',
    medications: '',
    routine: ''
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateField = (field: keyof AnamnesisData, value: string) => {
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitAnamnesis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 🚀 Chamada Stateless com JWT para o seu backend atual
      await api.post('/v1/patients/anamnesis', formData);

      // Sucesso! Volta pro dashboard (onde o status passará a ser COMPLETED)
      router.push('/me');
    } catch (err: unknown) {
      console.error('Erro ao salvar anamnese:', err);
      setError(axios.isAxiosError(err) ? (err.response?.data?.message ?? 'Ocorreu um erro ao processar seus dados clínicos.') : 'Ocorreu um erro ao processar seus dados clínicos.');
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
    submitAnamnesis
  };
}