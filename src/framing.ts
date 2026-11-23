import { Socket } from 'node:net'
import { ProtocolMessage } from './protocol';


export const sendJson = (
    socket: Socket,
    payload: ProtocolMessage
) => {
    socket.write(JSON.stringify(payload) + '\n');
}

export const createJsonLineReader = (
    socket: Socket,
    onMessage: (data: ProtocolMessage) => void,
    onError: (err: Error | any, rawLine: string) => void
) => {

    let buffer = '';

    socket.on('data', (chunk) => {
        buffer += chunk.toString('utf8');

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const rawLine = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);

          if (!rawLine) continue;

          try {
            onMessage(JSON.parse(rawLine));
          } catch (err) {
            if (onError) onError(err, rawLine);
          }
        }
    });
}
