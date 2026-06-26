export type UserRole = 'ADMIN' | 'CLIENT' | 'NUTRI' | 'EFI' | 'ASSISTANT';
export interface SessionUser { id: string; name: string | null; role: UserRole; }
export interface PatientSummary { id: string; name: string; status: 'RED' | 'YELLOW' | 'GREEN'; score: number; trigger: string | null; aiAnalysis?: string; aiMessage?: string | null; goal?: string; onboardingDate?: string; }
export interface DashboardMetrics { totalActive: number; riskCount: number; averageHealthScore: number; mrr: number; }
export interface DashboardData { user: SessionUser; metrics: DashboardMetrics; patients: PatientSummary[]; }
