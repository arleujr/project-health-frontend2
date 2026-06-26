'use client';

import React from 'react';
import { 
  Target, Flame, Utensils, Dumbbell, 
  BrainCircuit, ArrowRight, CheckCircle2 
} from 'lucide-react';

interface PatientWidgetsProps {
  userName: string;
  // Esses dados virão do seu backend futuramente
  metrics?: {
    currentStreak: number;
    weightLost: number;
    nextGoal: string;
  };
}

export function PatientWidgets({ userName, metrics }: PatientWidgetsProps) {
  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. AI DAILY BRIEFING (Motivacional e Direto) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden border border-emerald-800 text-white">
        <BrainCircuit className="absolute -right-10 -bottom-10 h-64 w-64 text-emerald-500/10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Seu Assistente
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Bom dia, {userName}! 🎯
          </h1>
          <p className="text-emerald-100/90 text-lg leading-relaxed max-w-3xl">
            Você está em uma sequência de <strong className="text-white">{metrics?.currentStreak || 4} dias no foco</strong>. Hoje temos treino de Membros Inferiores e sua dieta já está liberada. Lembre-se de bater a meta de 3L de água!
          </p>
          
          <div className="mt-6 flex gap-4">
            <button className="bg-emerald-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-400 transition-colors shadow-sm">
              Registrar Peso de Hoje
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROGRESS GRID (Gamificação do Paciente) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Streak Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">No Foco!</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{metrics?.currentStreak || 4} Dias</h3>
            <p className="text-sm font-medium text-slate-500">Sequência atual</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">-{metrics?.weightLost || 2.5}kg</h3>
            <p className="text-sm font-medium text-slate-500">Eliminados até agora</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MISSÕES DO DIA (Treino e Dieta) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Treino */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-indigo-600" /> Treino de Hoje
            </h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              Ver Ficha <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Treino C - Pernas e Glúteos</h4>
              <p className="text-xs text-slate-500 font-medium">Duração estimada: 50 min</p>
            </div>
            <button className="h-8 w-8 rounded-full border-2 border-slate-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-500 transition-all text-transparent">
              <CheckCircle2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dieta */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-emerald-600" /> Cardápio
            </h2>
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
              Ver Dieta <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Próxima Refeição: Almoço</h4>
              <p className="text-xs text-slate-500 font-medium">150g Frango + 100g Arroz + Salada</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              12:30
            </span>
          </div>
        </div>

      </div>
      
    </div>
  );
}