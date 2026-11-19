import net from 'net'
import { ProtocolMessage } from './protocol';
import { ProtocolSchema } from './validation';
import { messageHandler } from './message.handler';
import { ClientManager } from './client.manager';

export class Server {
    private clientManager = new ClientManager();

    serializeMessage(message: ProtocolMessage): string {
        return JSON.stringify(message)
    }

    parseMessage(raw: string): unknown {
        try {
            return JSON.parse(raw)
        } catch (error) {
            throw new Error('ERROR Invalid JSON')
        }
    }

    decode(raw: string): ProtocolMessage | undefined {
        try {
            console.log(raw)
            const parsed = this.parseMessage(raw)
            const result = ProtocolSchema.safeParse(parsed)

            if (!result.success) throw new Error('ERROR Invalid Protocol Message')

            return result.data as ProtocolMessage
        } catch (error) {
            console.error(error.message)
        }

    }

    run() {
        const server = net.createServer((socket) => {
            const clients = [];
            const clientId = `${socket.remoteAddress}: ${socket.remotePort}`
            console.log(`Socket connected: ${clientId}`)

            // enable keepalived system, this will make the OS send probes to the client every 10 seconds
            // probes are simply small test message to check wether the client is responding
            socket.setKeepAlive(true, 10000)

            // we pause the socket for 30 seconds to see if it respond to the keepalive
            socket.setTimeout(30000)

            // if timeout is reached, we forefuly destroy the connection
            socket.on('timeout', () => {
                console.log(`${clientId} timedout, forcefuly closing the connection...`)
                socket.destroy()
            })

            socket.on('data', (data) => {
                // console.log(`Data: ${data.toString()}`)
                // console.log(data)
                console.log(data.toString())
                // const parsed = this.parseMessage(this.serializeMessage(data))

                const decoded = this.decode(data.toString())
                console.log(decoded)

                // handle message
                // PING
                // LOGIN
                // REGISTER
                // ...

                if (decoded) {
                    messageHandler(
                        decoded,
                        socket,
                        this.clientManager
                    )
                }
            })

            socket.on('end', () => {
                console.log(`Client disconnected: ${clientId}`)
                socket.destroy()
            })

            socket.on('error', (err) => {
                console.log(`Socket error on ${clientId}: ${err.message}`)
                socket.destroy()
            })
        })

        server.listen(6678, '127.0.0.1', () => {
            console.log('Server is listening on port 6678')
        })
    }

}

const server = new Server();
server.run()

// test message decoding
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

console.log(decoded)
