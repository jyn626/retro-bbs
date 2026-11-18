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

export interface ErrorMessage {
    payload: {
        message: string;
        code: string;
    }
}

export type ProtocolMessage =
    | PongMessage
    | ErrorMessage
    | PingMessage
