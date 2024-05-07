const { spawn } = require('child_process');
const { Client } = require('discord-rpc');
const { WebSocketServer, WebSocket } = require('ws');

// Example: Spawn a child process to execute the 'ls' command
const ls = spawn('node', [`${__dirname}/arrpc/src`]);

function runTheRest()
{
    const arpc = new WebSocket('ws://127.0.0.1:6464')
    const server = new WebSocketServer({port: 5555})
    
    server.on('connection', function connection(ws) {
        ws.on('error', console.error);
    
        ws.on('message', function message(data) {
            //forward message to arpc
            const startTimestamp = new Date();
            const parsed = JSON.parse(Buffer.from(data).toString())
            console.log(parsed)
            arpc.send(JSON.stringify({
                "cmd": "SET_ACTIVITY",
                "args": {
                  "pid": 9999,
                  "activity": {
                    
                        "name": "Rocket League",
                        "type": 0,
                        "application_id": "379286085710381999",
                        "state": "In a Match",
                        "details": "Ranked Duos: 2-1",
                        "timestamps": {
                          "start": 15112000660000
                        },
                        "party": {
                          "id": "9dd6594e-81b3-49f6-a6b5-a679e6a060d3",
                          "size": [2, 2]
                        },
                        "assets": {
                          "large_image": "351371005538729000",
                          "large_text": "DFH Stadium",
                          "small_image": "351371005538729111",
                          "small_text": "Silver III"
                        },
                        "secrets": {
                          "join": "025ed05c71f639de8bfaa0d679d7c94b2fdce12f",
                          "spectate": "e7eb30d2ee025ed05c71ea495f770b76454ee4e0",
                          "match": "4b2fdce12f639de8bfa7e3591b71a0d679d7c93f"
                        }
                      
                  }
                },
              }))

        });
        ws.send('something');
    });

    var cleanExit2 = function() { 
        console.log("EXIT SERVER/LISTENERS");
        server.close()
        arpc.close()
     };
    process.on('SIGINT', cleanExit2); // catch ctrl-c
    process.on('SIGTERM', cleanExit2); // catch kill

    console.log("Server properly established")
}


var cleanExit = function() { 
    console.log("EXIT CHILD");
    ls.kill()
 };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
setTimeout(runTheRest, 1e3)
// Capture stdout data from the child process
let done = false
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

});

// Capture stderr data from the child process
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// Handle the child process exit event
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
