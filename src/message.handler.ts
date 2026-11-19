import { Socket } from "node:net";
import { ProtocolMessage } from "./protocol";
import { ClientManager } from "./client.manager";

const handlePing = (socket: Socket, id: number) => {
    socket.write(JSON.stringify({
        type: 'PONG',
        id,
        payload: {
            message: 'PONG',
            timestamps: Date.now().toString()
        }
    }))
}

const handleError = (socket: Socket, id: number, message: string) => {
    socket.write(JSON.stringify({
        type: 'ERROR',
        id,
        payload: {
            message,
            timestamps: Date.now().toString()
        }
    }))
}

const handleLogin = (
    socket: Socket,
    data: ProtocolMessage,
    clientManager: ClientManager
) => {
    // ! TODO: implement a database to store account\
    // ! for now this account is TEMPORARY
    const account = {
        username: 'jyn',
        password: '1212'
    }
    const { type, payload } = data;

    if ("username" in payload) {
        if (
            payload.username == account.username &&
            payload.password == account.password
        ) {
            clientManager.add(socket)
        } else {
            handleError(socket, data.id, 'ERROR invalid credentials')
        }
    } else {
        handleError(socket, data.id, 'ERROR invalid credentials')
    }

}

// TODO: complete all message types
export const messageHandler = (
    data: ProtocolMessage,
    socket: Socket,
    clientManager: ClientManager
    ) => {
    // handle message base on its type
    const type = data.type;

    switch (type) {
        case 'PING':
            // socket.write('PONG\n')
            handlePing(socket, data.id)
            break;
        case 'LOGIN':
            handleLogin(socket, data, clientManager)
            break;
        default:
            socket.write('PONG\n')
    }
}
