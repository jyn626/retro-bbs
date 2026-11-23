export interface BaseMessage {
    id: number;
}

export interface PongMessage extends BaseMessage {
    type: "PONG",
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface PingMessage extends BaseMessage {
    type: "PING",
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface LoginMessage extends BaseMessage {
    type: "LOGIN",
    payload: {
        username: string;
        password: string;
    }
}

export interface RegisterMessage extends BaseMessage {
  type: "REGISTER",
  payload: {
    username: string;
    password: string;
  }
}

export interface ResponseMessage extends BaseMessage {
    type: "RESPONSE",
    payload: {
        message: string;
        timestamps: string;
    }
}

export interface ErrorMessage extends BaseMessage {
    type: "ERROR",
    payload: {
        message: string;
        code: string;
    }
}

export type ProtocolMessage =
    | PongMessage
    | ErrorMessage
    | PingMessage
    | LoginMessage
    | RegisterMessage
    | ResponseMessage
