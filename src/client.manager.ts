import { Socket } from "node:net";

type ClientSession = {
    userId: number;
}

// this handles the clients in a session
// if a client logins correctly then call the `add` function.
export class ClientManager {
    private clients = new Map<Socket, ClientSession>()

    add(socket: Socket) {
        // TODO: improve id format, maybe a randomized string ?
        const userId = this.clients.size + 1;
        this.clients.set(socket, { userId });
    }

    get(socket: Socket) {
        return this.clients.get(socket);
    }

}
