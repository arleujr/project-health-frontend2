'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
  };

  const authenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 🎭 SMOKE AND MIRRORS: Para o MVP, não vamos bater no backend real.
    // Vamos apenas simular a latência da rede e jogar você para o Painel.
    setTimeout(() => {
      setIsLoading(false);
      // Na sua apresentação, isso joga direto para a Central de Triagem
      router.push('/admin'); 
    }, 1500);
  };

  return {
    mode,
    isLoading,
    error,
    toggleMode,
    authenticate
  };
}