const { Client, register } = require('discord-rpc');
const clientId = '1237330013632860170';  // Replace with your actual Client ID

const rpc = new Client({ transport: 'ipc' });
const r = register(clientId)
const scopes = ['rpc', "rpc.activities.write"];
console.log("Register " + r)
rpc.on('ready', () => {
    console.log('Rich Presence is active.');

    rpc.setActivity({
        details: 'aoaoaw',
        state: 'test',
        largeImageKey: 'movie_image',  // Make sure to upload this image in the 'Art Assets' in your app settings
        startTimestamp: new Date(),
        instance: false,
    });
});

rpc.login({ clientId:clientId, clientSecret: "XgluKmH4G81P7STiApRf6sDfssHHnMd6", scopes: scopes, redirectUri: "https://127.0.0.1" }).catch(console.error);
