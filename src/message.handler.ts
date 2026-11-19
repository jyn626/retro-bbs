import { Socket } from "node:net";
import { ProtocolMessage } from "./protocol";


// TODO: complete all message types
export const messageHandler = (data: ProtocolMessage , socket: Socket) => {
    // handle message base on its type
    const type = data.type;

    switch (type) {
        case 'ping':
            socket.write('PONG\n')
            break;
        default:
            socket.write('PONG\n')
    }
}
