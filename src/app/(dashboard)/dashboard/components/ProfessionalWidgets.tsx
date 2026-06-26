'use client';

import React from 'react';
import { Calendar, AlertCircle, TrendingUp, Users, BrainCircuit } from 'lucide-react';

import type { DashboardMetrics, PatientSummary } from '@/types/dashboard';

interface ProfessionalWidgetsProps {
  userName: string;
  professionalType: string;
  patients: PatientSummary[];
  stats?: DashboardMetrics;
}

export function ProfessionalWidgets({ userName, professionalType, patients, stats }: ProfessionalWidgetsProps) {
  // 🟢 CÁLCULO REAL: Baseado nos dados que já vêm do seu Axios/SWR
  const activePatientsCount = patients.length;

  return (
    <div className="space-y-6">
      
      {/* 1. AI DAILY BRIEFING */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden border border-indigo-800 text-white">
        <BrainCircuit className="absolute -right-10 -bottom-10 h-64 w-64 text-indigo-500/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              IA Copiloto
            </span>
            <span className="text-indigo-300 text-xs font-semibold">{professionalType}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Bom dia, {userName}! ☕
          </h1>
          <p className="text-indigo-100/90 text-lg leading-relaxed max-w-3xl">
            Você tem <strong className="text-white">{0} atendimentos</strong> hoje. 
            Você possui <strong className="text-white">{activePatientsCount} pacientes ativos</strong> na sua carteira.
          </p>
        </div>
      </div>

      {/* 2. OPERATIONAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* SLA Card */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-rose-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{stats?.riskCount ?? 0}</h3>
            <p className="text-sm font-medium text-slate-500">SLA Atrasado</p>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{0}</h3>
            <p className="text-sm font-medium text-slate-500">Health Score Médio</p>
          </div>
        </div>

        {/* Active Patients Card (CALCULADO REALMENTE) */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{activePatientsCount}</h3>
            <p className="text-sm font-medium text-slate-500">Pacientes Ativos</p>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{stats?.averageHealthScore ?? 0}%</h3>
            <p className="text-sm font-medium text-slate-500">Health Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}