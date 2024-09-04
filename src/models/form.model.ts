import { z } from "zod";

export const schema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email es inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
  }).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ['confirmPassword']
  });
  
export type FormValues = z.infer<typeof schema>;