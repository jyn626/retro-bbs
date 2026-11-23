import { Socket } from "node:net";
import { LoginMessage, ProtocolMessage, RegisterMessage, ResponseMessage } from "./protocol";
import { ClientManager } from "./client.manager";
import { db, User } from './db'
import { hashString } from './hash'

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
    data: LoginMessage,
    clientManager: ClientManager
) : ResponseMessage | undefined => {
    // ! TODO: implement a database to store account\
    // ! for now this account is TEMPORARY
    const account = {
        username: 'jyn',
        password: '1212'
    }
    const { payload } = data;

    // type narrowing ProtocolMessage, so we'll get the LoginMessage Type
    if ("username" in data.payload && "password" in data.payload) {
        if (
            payload.username == account.username &&
            payload.password == account.password
        ) {
            clientManager.add(socket)

            const response: ResponseMessage = {
                type: 'RESPONSE',
                id: data.id,
                payload: {
                    message: 'Authenticated successfully.',
                    timestamps: Date.now().toString()
                }
            }

            socket.write(JSON.stringify(response))

            return response;
        } else {
            handleError(socket, data.id, 'ERROR invalid credentials')
        }
    } else {
        handleError(socket, data.id, 'ERROR invalid credentials')
    }

}

const handleRegister = async (
    socket: Socket,
    data: RegisterMessage
): Promise<ResponseMessage | undefined>  => {
  try {
      if ("username" in data.payload && "password" in data.payload) {
        // extract credentials
        const { username, password } = data.payload;

        // check if username already exists
        const getUserByUsername = db.prepare('SELECT * FROM users WHERE username = ?')
        const result = getUserByUsername.get(username) as User | undefined

        if (result !== undefined) {
          throw new Error('ERROR username already exists.')
        }

        // hash password
        const hashedPassword = await hashString(password);

        // store the new user
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?,?)');
        insertUser.run(username, hashedPassword)
        console.log('User registered successfully.')

        const response: ResponseMessage = {
            type: 'RESPONSE',
            id: data.id,
            payload: {
                message: 'Registered successfully.',
                timestamps: Date.now().toString()
            }
        }

        socket.write(JSON.stringify(response))

        return response;
      }

  } catch (error) {
    if (error instanceof Error) {
        console.log('ERROR ' + error.message)
    }
      console.log('ERROR somethign went wrong in handleRegister function.')
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
      case 'REGISTER':
            // TODO: solve the error here
            handleRegister(socket, data)
            break;
        default:
            socket.write('PONG\n')
}
}
