'use client';

import Link from 'next/link';
import { ArrowRight, UserPlus, Users } from 'lucide-react';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { ProfessionalWidgets } from './components/ProfessionalWidgets';
import { PatientWidgets } from './components/PatientWidgets';
import { AdminWidgets } from './components/AdminWidgets';
import { CopilotChat } from './components/CopilotChat';

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();
  if (isLoading) return <main className="min-h-screen bg-slate-50 p-10"><div className="mx-auto h-40 max-w-5xl animate-pulse rounded-2xl bg-slate-200" /></main>;
  if (isError || !data) return <main className="grid min-h-screen place-items-center bg-slate-50"><p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">Não foi possível carregar o dashboard.</p></main>;
  const { user, patients, metrics } = data;
  const isProfessional = ['NUTRI', 'EFI', 'ASSISTANT'].includes(user.role);
  return <main className="min-h-screen bg-slate-50 p-6 md:p-10">
    <div className="mx-auto max-w-5xl space-y-8">
      {isProfessional && <ProfessionalWidgets userName={user.name ?? 'Profissional'} professionalType={user.role === 'NUTRI' ? 'Nutricionista' : user.role === 'EFI' ? 'Educação Física' : 'Assistente'} patients={patients} stats={metrics} />}
      {user.role === 'CLIENT' && <PatientWidgets userName={user.name ?? 'Paciente'} />}
      {user.role === 'ADMIN' && <AdminWidgets userName={user.name ?? 'Administrador'} />}
      {user.role !== 'CLIENT' && <>
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-4 pt-6 md:flex-row md:items-center md:justify-between"><h2 className="flex items-center gap-2 text-xl font-bold"><Users className="h-6 w-6 text-indigo-600" />Meus pacientes</h2><Link href="/onboarding" className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white"><UserPlus className="h-4 w-4" />Novo paciente</Link></header>
        <section className="grid gap-3">{patients.length === 0 ? <div className="rounded-2xl border border-dashed bg-white p-8 text-center text-sm text-slate-500">Nenhum paciente encontrado.</div> : patients.map((patient) => <article key={patient.id} className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"><div><h3 className="font-bold">{patient.name}</h3><span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold">{patient.status} · {patient.score}</span></div><Link href={`/patient/${patient.id}`} className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">Abrir prontuário<ArrowRight className="h-3 w-3" /></Link></article>)}</section>
      </>}
    </div>
    <CopilotChat />
  </main>;
}
