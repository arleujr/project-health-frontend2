'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowRight, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authenticateOtpBodySchema } from '@/shared/schemas/auth-schemas';

function messageFrom(error: unknown) {
  if (axios.isAxiosError(error)) return error.response?.data?.message ?? 'Não foi possível concluir a solicitação.';
  return 'Não foi possível concluir a solicitação.';
}

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  async function handleSendOtp() {
    const result = authenticateOtpBodySchema.safeParse({ email, otpCode: '000000' });
    if (!result.success) return setError(result.error.flatten().fieldErrors.email?.[0] ?? 'Informe um e-mail válido.');
    setIsLoading(true); setError(null);
    try {
      const response = await axios.post('/api/auth/request-otp', { email });
      setDevCode(response.data.devCode ?? null);
      setStep('otp');
    } catch (err) { setError(messageFrom(err)); } finally { setIsLoading(false); }
  }

  async function handleVerifyOtp() {
    const result = authenticateOtpBodySchema.safeParse({ email, otpCode });
    if (!result.success) return setError(result.error.flatten().fieldErrors.otpCode?.[0] ?? 'Informe o código de seis dígitos.');
    setIsLoading(true); setError(null);
    try {
      await axios.post('/api/auth/verify-otp', { email, otpCode });
      router.replace('/dashboard'); router.refresh();
    } catch (err) { setError(messageFrom(err)); } finally { setIsLoading(false); }
  }

  return <main className="min-h-screen grid place-items-center bg-slate-50 p-4">
    <Card className="w-full max-w-md rounded-2xl border-slate-200 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-xl bg-slate-950"><ShieldCheck className="h-6 w-6 text-white" /></div>
        <CardTitle className="text-2xl">Projeto Health</CardTitle>
        <CardDescription>{step === 'email' ? 'Receba um código seguro no seu e-mail.' : 'Digite o código de seis dígitos.'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {devCode && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Ambiente de desenvolvimento: código {devCode}</p>}
        {step === 'email' ? <>
          <div className="relative"><Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" className="h-11 pl-10" /></div>
          <button disabled={isLoading} onClick={handleSendOtp} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white disabled:opacity-50">{isLoading ? 'Enviando...' : 'Enviar código'}<ArrowRight className="h-4 w-4" /></button>
        </> : <>
          <div className="relative"><KeyRound className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" className="h-11 pl-10 text-center font-mono text-lg tracking-[0.45em]" /></div>
          <button disabled={isLoading} onClick={handleVerifyOtp} className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white disabled:opacity-50">{isLoading ? 'Verificando...' : 'Entrar com segurança'}</button>
          <button onClick={() => { setStep('email'); setOtpCode(''); setDevCode(null); }} className="w-full text-sm text-slate-500">Alterar e-mail</button>
        </>}
      </CardContent>
    </Card>
  </main>;
}
