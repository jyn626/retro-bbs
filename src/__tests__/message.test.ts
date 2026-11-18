import { decode } from "zod/mini";
import { Server } from "../server";
import { describe, it, expect } from '@jest/globals'

describe('decoding', () => {
    it('should decode message in the proper format', () => {
        const server = new Server();

        const data = {
            id: 2,
            type: 'ping',
            payload: {
                message: 'PING',
                timestamps: Date.now().toString()
            }
        }

        const serialized = server.serializeMessage(data);
        const decoded = server.decode(serialized);

        expect(decoded).toEqual({
            type: 'ping',
            id: 2,
            payload: {
                message: 'PING',
                timestamps: expect.any(String)
            }
        })
    })
})
