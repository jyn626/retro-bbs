import net from 'node:net'

const client = net.createConnection({
    host: '127.0.0.1',
    port: 6678
});

client.on('connect', () => {
    console.log('Connected to the server.')

    client.write(JSON.stringify({
        id: 1,
        type: 'ping',
        payload: {
            message: 'PING',
            timestamps: Date.now().toString()
        }
    }))
})
