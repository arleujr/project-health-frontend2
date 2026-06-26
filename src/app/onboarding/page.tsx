'use client';
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  User,
} from 'lucide-react';

import {
  useOnboarding,
  type BasicProfileData,
} from '@/hooks/use-onboarding';

export default function OnboardingPage() {
  const {
    submitProgressiveProfile,
    isLoading,
    error,
    setError,
  } = useOnboarding();

  const [formData, setFormData] =
    useState<BasicProfileData>({
      name: '',
      goal: '',
      restriction: '',
      termsAccepted: false,
      privacyAccepted: false,
    });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >,
  ) => {
    setError(null);

    const target = event.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === 'checkbox'
    ) {
      setFormData((previous) => ({
        ...previous,
        [target.name]: target.checked,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await submitProgressiveProfile(
      formData,
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
        <header className="relative overflow-hidden bg-slate-900 px-8 py-10 text-center">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-slate-800 opacity-50 blur-2xl" />

          <Sparkles className="mx-auto mb-4 h-8 w-8 text-amber-400" />

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Bem-vindo ao Projeto Health
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Vamos configurar seu perfil básico.
            Você poderá completar os dados clínicos
            gradualmente.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
            >
              <User className="h-4 w-4 text-slate-400" />
              Como podemos chamar você?
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={120}
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="goal"
              className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
            >
              <Target className="h-4 w-4 text-slate-400" />
              Qual é seu objetivo principal?
            </label>

            <select
              id="goal"
              name="goal"
              required
              value={formData.goal}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
            >
              <option value="" disabled>
                Selecione uma meta
              </option>

              <option value="WEIGHT_LOSS">
                Emagrecimento
              </option>

              <option value="MUSCLE_GAIN">
                Hipertrofia
              </option>

              <option value="HEALTH">
                Saúde e disposição
              </option>

              <option value="PERFORMANCE">
                Performance esportiva
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="restriction"
              className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
            >
              <AlertTriangle className="h-4 w-4 text-slate-400" />
              Possui alguma dor, restrição ou alergia?
            </label>

            <textarea
              id="restriction"
              name="restriction"
              maxLength={2000}
              placeholder="Ex.: dor no joelho, alergia à lactose..."
              value={formData.restriction}
              onChange={handleChange}
              disabled={isLoading}
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
            />

            <p className="mt-2 text-xs text-slate-500">
              O relato será registrado para triagem
              e avaliação dos profissionais. A análise
              automática não substitui avaliação
              clínica ou atendimento de emergência.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                Li e aceito os termos de uso.
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                Li e aceito a política de privacidade
                e o tratamento dos dados informados.
              </span>
            </label>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />

              <p className="text-sm font-semibold text-rose-700">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 font-bold text-white shadow-md transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Salvando perfil...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Continuar para meu painel
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}