export interface BaseMessage {
    id: number;
}

export interface PongMessage extends BaseMessage {
    type: 'pong',
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface PingMessage extends BaseMessage {
    type: 'PING',
    payload: {
        message: string;
        timestamps: string;
    },
}

export interface ErrorMessage {
    type: 'ERROR',
    payload: {
        message: string;
        code: string;
    }
}

export type ProtocolMessage =
    | PongMessage
    | ErrorMessage
    | PingMessage
