import net, { Socket } from 'node:net'
import { ProtocolMessage } from './protocol';

export const client = net.createConnection({
    host: '127.0.0.1',
    port: 6678
});

client.on('connect', () => {
    console.log('Connected to the server.')
})

// client.on('data', (data) => {
//     console.log('Received from server.')
//
//     console.log(data.toString())
//
//     const parsed = JSON.parse(data.toString())
//
//     if (parsed.type == 'PONG') {
//         // --- TEST AUTH ---
//         client.write(JSON.stringify({
//             id: 2,
//             type: 'LOGIN',
//             payload: {
//                 username: 'jyn',
//                 password: '1212',
//             }
//         }))
//     }
// })
