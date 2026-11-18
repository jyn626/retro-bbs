import net from 'net'
import { ProtocolMessage } from './protocol';
import { ProtocolSchema } from './validation';

export class Server {
    constructor() { }

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

    decode(raw: string): ProtocolMessage {
        const parsed = this.parseMessage(raw)

        const result = ProtocolSchema.safeParse(parsed)

        if (!result.success) throw new Error('ERROR Invalid Protocol Message')

        return result.data as ProtocolMessage
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

            // send message from server to client
            socket.write("Welcome to BBS")

            // receives messages from client to server
            socket.on('data', (data) => {
                console.log(`Data: ${data.toString()}`)
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
