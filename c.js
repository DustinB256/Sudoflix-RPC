const { spawn } = require('child_process');
const { Client, register} = require('discord-rpc');
const { TimeSpan } = require('timespan');
const { WebSocketServer, WebSocket } = require('ws');

function runTheRest()
{
    const server = new WebSocketServer({port: 5555})
    
    const { Client } = require('discord-rpc');

    const clientId = '1237330013632860170';
    const r = register(clientId)
    console.log("Register " + r)
    const scopes = ['rpc', "rpc.activities.write"];
    
    const client = new Client({ transport: 'ipc' });

    client.on('ready', () => {
    // console.log('Logged in as', client);
        console.log('Authed for user', client.user.username);

    });

    client.login({ clientId:clientId, clientSecret: "XgluKmH4G81P7STiApRf6sDfssHHnMd6", scopes: scopes, redirectUri: "https://127.0.0.1" });

    server.on('connection', function connection(ws) {
        ws.on('error', console.error);
    
        ws.on('message', function message(data) {
            //forward message to arpc
            const parsed = JSON.parse(Buffer.from(data).toString()).payload
            console.log(parsed)

            const startTimestamp = new Date();
            const endTimestamp = new Date().setMilliseconds(startTimestamp.getMilliseconds() + (parsed.progress.total - parsed.progress.current) * 1000)
            client.setActivity({
                state: parsed.title,
                title:"yuuyyuyff",
                details: parsed.title,
                startTimestamp,
                endTimestamp,
                type: 0,
                largeImageKey: parsed.poster,
                largeImageText: 'tea is delicious',
                smallImageKey: 'snek_small',
                smallImageText: 'i am my own pillows',
                instance: true,
            }, 69)

        });
        ws.send('something');
    });

    var cleanExit2 = function() { 
        console.log("EXIT SERVER/LISTENERS");
        server.close()
        client.destroy()
     };
    process.on('SIGINT', cleanExit2); // catch ctrl-c
    process.on('SIGTERM', cleanExit2); // catch kill

    console.log("Server properly established")
}

runTheRest()
