import { z } from 'zod'

const PingSchema = z.object({
    type: z.literal('ping'),
    id: z.number(),
    payload: z.object({
        message: z.string(),
        timestamps: z.string(),
    })
})

const PongSchema = z.object({
    type: z.literal('pong'),
    id: z.number(),
    payload: z.object({
        message: z.string(),
        timestamps: z.string(),
    })
})


export const ProtocolSchema = z.discriminatedUnion("type", [
    PingSchema,
    PongSchema
])
