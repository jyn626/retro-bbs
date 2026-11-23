import { z } from 'zod'

const PingSchema = z.object({
    type: z.literal('PING'),
    id: z.number(),
    payload: z.object({
        message: z.string(),
        timestamps: z.string(),
    })
})

const LoginSchema = z.object({
    type: z.literal('LOGIN'),
    id: z.number(),
    payload: z.object({
        username: z.string(),
        password: z.string()
    })
})

export const RegisterSchema = z.object({
    type: z.literal('REGISTER'),
    id: z.number(),
    payload: z.object({
        username: z.string(),
        password: z.string()
    })
})

export type Register = z.infer<typeof RegisterSchema>;

export const ProtocolSchema = z.discriminatedUnion("type", [
    PingSchema,
    LoginSchema,
    RegisterSchema
])
