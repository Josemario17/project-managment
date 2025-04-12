import { z } from "zod";

export const FormSchemaSignIn = z.object({
    email: z.string()
        .email("Email inválido.")
        .min(4, "Campo obrigatório.")
        .max(50, "Máximo de 50 caracteres."),
    password: z.string()
        .min(1, "Campo obrigatório.")
        .min(6, "Senha deve ter no mínimo 6 caracteres.")
})

export const FormSchemaSignUp = z.object({
    name: z.string()
        .min(1, "Campo obrigatório.")
        .min(3, "Nome deve ter no mínimo 3 caracteres.")
        .regex(/^(?!\s*$).+/, "Campo obrigatório.")
        .max(50, "Máximo de 50 caracteres."),
    email: z.string()
        .email("Email inválido.")
        .min(4, "Campo obrigatório.")
        .max(50, "Máximo de 50 caracteres."),
    password: z.string()
        .min(1, "Campo obrigatório.")
        .min(6, "Senha deve ter no mínimo 6 caracteres.")
})
 