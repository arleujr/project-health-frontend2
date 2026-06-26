import { z } from 'zod';

// Este schema valida o login do frontend idêntico ao backend
export const authenticateOtpBodySchema = z.object({
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().min(10, "Telefone inválido").optional(),
  otpCode: z.string().length(6, "O código OTP deve ter exatamente 6 dígitos"),
}).refine(data => data.email || data.phone, {
  message: "Forneça ao menos o e-mail ou o telefone para o login.",
  path: ["email"]
});