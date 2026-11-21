export interface BaseMessage {
    type: string;
    id: number;
}

export interface PongMessage extends BaseMessage {
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface PingMessage extends BaseMessage {
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface LoginMessage extends BaseMessage {
    payload: {
        username: string;
        password: string;
    }
}

export interface RegisterMessage extends BaseMessage {
    payload: {
        username: string;
        password: string;
      }
    }

export interface ErrorMessage extends BaseMessage {
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
