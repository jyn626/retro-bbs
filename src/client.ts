import net from 'node:net'

const client = net.createConnection({
    host: '127.0.0.1',
    port: 6678
});

client.on('connect', () => {
    console.log('Connected to the server.')

    client.write(JSON.stringify({
        id: 1,
        type: 'PING',
        payload: {
            message: 'PING',
            timestamps: Date.now().toString()
        }
    }))


})

client.on('data', (data) => {
    console.log('Received from server.')

    console.log(data.toString())

    const parsed = JSON.parse(data.toString())

    if (parsed.type == 'PONG') {
        // --- TEST AUTH ---
        client.write(JSON.stringify({
            id: 2,
            type: 'LOGIN',
            payload: {
                username: 'jyn',
                password: '1212',
            }
        }))
    }
})
