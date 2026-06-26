'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ Official Next.js hook for dynamic route params
import Link from 'next/link'; // ✅ Next.js Link component for smooth client-side navigation
import { 
  Activity, BrainCircuit, AlertCircle, CheckCircle2, 
  Clock, TrendingDown, Settings2, FileText, ArrowLeft
} from 'lucide-react';
import { api } from '@/lib/api'; // ✅ Axios/Fetch wrapper for backend requests

// ✅ TypeScript interface for tickets (strong typing instead of `any`)
interface Ticket {
  id: string;
  title: string;
  description: string;
  isOverdue: boolean;
  delayInHours?: number;
  slaExpiresAt?: string;
}

export default function PatientWarRoom() {
  // ✅ Capture dynamic route params (e.g. /patients/[id])
  const params = useParams();
  const patientId = params.id as string;

  // ✅ Local state for backend data
  const [magicSummary, setMagicSummary] = useState<string>("Loading AI analysis...");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch patient war room data on mount
  useEffect(() => {
    async function loadWarRoomData() {
      try {
        // 1. Added /plans in the summary route
        const summaryResponse = await api.get(`/v1/plans/patients/${patientId}/summary`);
        setMagicSummary(summaryResponse.data.summary);

        // 2. Added /plans in the tickets route
        const ticketsResponse = await api.get(`/v1/plans/patients/${patientId}/tickets`);
        setTickets(ticketsResponse.data.tickets);

      } catch (error) {
        console.error("Error loading War Room data:", error);
        setMagicSummary("Unable to generate summary at the moment.");
      } finally {
        setIsLoading(false);
      }
    }

    // ✅ Only load data if patientId exists
    if (patientId) {
      loadWarRoomData();
    }
  }, [patientId]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans w-full">
      
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* NAVIGATION HEADER: Provides instant client-side fallback to professional dashboard */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-start">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        {/* =========================
            1. HEADER SECTION
        ========================== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          
          {/* Patient avatar + info */}
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center font-bold text-xl text-white shadow-md">
              {/* Placeholder initials until backend provides photo */}
              JS
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                João Silva
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                  ACTIVE
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                35 years • Goal: Hypertrophy • Last seen: 2 hours ago
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none h-11 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
              <Settings2 className="h-4 w-4" />
              Customize View
            </button>
            <button className="flex-1 md:flex-none h-11 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Shield Plan
            </button>
          </div>
        </div>

        {/* =========================
            2. GRID LAYOUT
        ========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT + CENTER COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* WIDGET 1: AI Summary */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl p-6 shadow-md relative overflow-hidden text-white border border-indigo-900">
              <BrainCircuit className="absolute -bottom-4 -right-4 h-32 w-32 text-indigo-500/10" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-sm font-bold tracking-wide text-indigo-300 uppercase">AI Clinical Summary</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed relative z-10 min-h-[60px]">
                {isLoading ? (
                  <span className="animate-pulse flex items-center gap-2">
                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                    Synthesizing patient history...
                  </span>
                ) : (
                  magicSummary
                )}
              </p>
            </div>

            {/* WIDGET 2: Weight Evolution Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-64 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-slate-400" />
                  Weight Progression
                </h2>
                <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingDown className="h-4 w-4" /> -2.4kg
                </div>
              </div>
              <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">
                [ Line Chart (Recharts) will be integrated here ]
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* WIDGET 3: SLA Cockpit */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full max-h-[400px]">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                  Action Queue (SLA)
                </h2>
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full">
                  {tickets.length} Pending
                </span>
              </div>
              
              <div className="p-3 space-y-2 flex-1 overflow-y-auto">
                {/* Empty state */}
                {tickets.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
                    <p className="text-sm font-medium">No pending tickets.</p>
                    <p className="text-xs">Everything under control! 🟢</p>
                  </div>
                )}

                {/* Ticket list */}
                {tickets.map((ticket) => (
                  <div key={ticket.id} className={`p-3 rounded-xl border transition-colors cursor-pointer flex gap-3 group
                    ${ticket.isOverdue ? 'border-rose-200 bg-rose-50 hover:bg-rose-100' : 'border-amber-200 bg-amber-50 hover:bg-amber-100'}
                  `}>
                    <div className="mt-0.5">
                      {ticket.isOverdue ? (
                        <AlertCircle className="h-4 w-4 text-rose-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold group-hover:opacity-80 
                        ${ticket.isOverdue ? 'text-rose-900' : 'text-amber-900'}
                      `}>
                        {ticket.title}
                      </h3>
                      <p className={`text-xs mt-0.5 
                        ${ticket.isOverdue ? 'text-rose-700/80' : 'text-amber-700/80'}
                      `}>
                        {ticket.description}
                      </p>
                      
                      {ticket.isOverdue ? (
                        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-rose-600 uppercase">
                          <Clock className="h-3 w-3" /> SLA Breached ({ticket.delayInHours}h late)
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-amber-600 uppercase">
                          <Clock className="h-3 w-3" /> Deadline: {new Date(ticket.slaExpiresAt!).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}