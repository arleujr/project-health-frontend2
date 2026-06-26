'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { PatientSummary } from '@/types/dashboard';
import { 
  Users, Activity, AlertCircle, CheckCircle2, MessageCircle, 
  BrainCircuit, TrendingUp, Zap, Copy, X, ArrowRight 
} from 'lucide-react';

// 🦴 Componente Skeleton customizado seguindo o padrão Shadcn/UI
function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded-md w-48"></div>
          <div className="h-4 bg-slate-200 rounded-md w-64"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-xl w-32"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="h-10 w-10 bg-slate-100 rounded-xl"></div>
              <div className="h-6 bg-slate-100 rounded w-16"></div>
            </div>
          ))}
        </div>
        <div className="md:col-span-4 h-64 bg-white border border-slate-200 rounded-3xl p-6">
          <div className="h-6 bg-slate-100 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useDashboard();
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [copied, setCopied] = useState(false);

  if (isLoading) return <div className="min-h-screen bg-slate-100 p-6 md:p-10 font-sans"><DashboardSkeleton /></div>;
  
  if (isError || !data) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-center">
        <div>
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">Erro ao carregar a API</h1>
          <p className="text-slate-500 mt-2">Verifique se o core-backend está rodando localmente.</p>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Dinâmico */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Visão Geral</h1>
            <p className="text-slate-500 font-medium">Seu ecossistema está sendo monitorado pela IA.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <Zap className="h-4 w-4" />
              MRR: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.metrics.mrr)}
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-md">
              + Novo Paciente
            </button>
          </div>
        </div>

        {/* BENTO GRID COM DADOS REAIS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="mt-4">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Pacientes Ativos</p>
                <p className="text-4xl font-extrabold text-slate-900">{data.metrics.totalActive}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="h-10 w-10 bg-rose-50 rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-rose-500" />
              </div>
              <div className="mt-4">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Taxa de Risco</p>
                <p className="text-4xl font-extrabold text-slate-900">
                  {data.metrics.riskCount}
                  <span className="text-lg text-slate-400 font-medium"> / {data.metrics.totalActive}</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                <TrendingUp className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="relative z-10 mt-4">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Health Score Médio</p>
                <p className="text-4xl font-extrabold text-white">{data.metrics.averageHealthScore}<span className="text-lg text-slate-500 font-medium"> / 100</span></p>
              </div>
            </div>
          </div>

          {/* Radar de Engajamento */}
          <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Radar de Engajamento</h2>
            <p className="text-sm text-slate-500 mb-6">Foque em quem precisa de você hoje.</p>
            
            <div className="space-y-3 flex-1">
              {data.patients.map((patient) => {
                const isGreen = patient.status.toUpperCase() === 'GREEN';
                return (
                  <div 
                    key={patient.id} 
                    onClick={() => !isGreen && setSelectedPatient(patient)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isGreen ? 'bg-slate-50 border-slate-100 opacity-60' : 
                      patient.status.toUpperCase() === 'YELLOW' ? 'bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50' : 
                      'bg-rose-50/50 border-rose-200 cursor-pointer hover:bg-rose-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${
                        isGreen ? 'bg-emerald-500' : patient.status.toUpperCase() === 'YELLOW' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      <span className="font-bold text-slate-700 text-sm">{patient.name}</span>
                    </div>
                    <span className="text-xs font-extrabold px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {patient.score} pts
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* HUB DE AÇÃO DA IA (MODAL) */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className={`p-6 border-b flex items-start justify-between ${
              selectedPatient.status.toUpperCase() === 'RED' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'
            }`}>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-slate-700" /> Alerta de Intervenção
                </h3>
                <p className="text-slate-700 text-sm font-medium mt-1">Paciente: <span className="font-bold">{selectedPatient.name}</span></p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="p-2 hover:bg-white rounded-full transition-colors"><X className="h-5 w-5 text-slate-500" /></button>
            </div>

            <div className="p-6 space-y-6">
              {selectedPatient.trigger && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gatilho do Alerta</h4>
                  <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 text-sm">{selectedPatient.trigger}</p>
                </div>
              )}
              {selectedPatient.aiAnalysis && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-indigo-500" /> Diagnóstico Preditivo (IA)</h4>
                  <p className="text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 leading-relaxed">{selectedPatient.aiAnalysis}</p>
                </div>
              )}
              {selectedPatient.aiMessage && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sugestão de Abordagem</h4>
                    <button onClick={() => handleCopy(selectedPatient.aiMessage || '')} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                      {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />} {copied ? 'Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                  <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl text-sm leading-relaxed relative group">
                    {`“${selectedPatient.aiMessage}”`}
                    <button className="absolute bottom-4 right-4 h-10 w-10 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-lg"><MessageCircle className="h-5 w-5 text-white" /></button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => {
                  setSelectedPatient(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Fechar alerta
              </button>
              <Link href={`/admin/patient/${selectedPatient.id}`} className="text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                Ver Perfil Completo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}