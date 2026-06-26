'use client';

import React from 'react';
import Link from 'next/link';
import { Play, ClipboardList, Activity, Flame, UserCircle, Award } from 'lucide-react';

export default function PatientDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header do Paciente */}
      <header className="bg-slate-900 text-white px-6 pt-10 pb-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-indigo-500">
              <UserCircle className="h-8 w-8 text-slate-300" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Bem-vindo de volta,</p>
              <h1 className="text-xl font-extrabold tracking-tight">Carlos Silva</h1>
            </div>
          </div>
          <button className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center relative">
            <Activity className="h-5 w-5 text-indigo-400" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-slate-900"></span>
          </button>
        </div>

        {/* Card de Fogo (Streak) */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-rose-500/20 rounded-xl flex items-center justify-center">
              <Flame className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Sequência Imbatível</p>
              <p className="text-xs text-slate-300">Você treinou 4 dias seguidos!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-rose-400">4<span className="text-sm text-slate-300 font-normal">x</span></p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6 -mt-2">
        
        {/* Botão de Ação Principal (Treinar Agora) */}
        <Link 
          href="/me/train" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl p-1 shadow-xl shadow-indigo-600/20 block transition-transform active:scale-[0.98]"
        >
          <div className="border border-white/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-bold mb-1">Treino do Dia</p>
              <h2 className="text-xl font-extrabold">Ficha A - Pernas</h2>
              <p className="text-indigo-200 text-xs mt-1">45 min • Foco: Hipertrofia</p>
            </div>
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <Play className="h-6 w-6 text-indigo-600 ml-1 fill-current" />
            </div>
          </div>
        </Link>

        {/* Menu Rápido */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/me/plan" className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 bg-sky-50 rounded-full flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-sky-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">Meu Plano</span>
          </Link>
          
          <Link href="/me/anamnesis" className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-emerald-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">Avaliações</span>
          </Link>
        </div>

        {/* Conquistas Recentes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" /> 
              Progresso
            </h3>
            <button className="text-xs font-bold text-indigo-600">Ver tudo</button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 font-bold">Meta de Peso</span>
              <span className="text-sm font-extrabold text-emerald-500">-2.5 kg</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-slate-400 text-right">Faltam 3.5 kg</p>
          </div>
        </div>

      </main>
    </div>
  );
}