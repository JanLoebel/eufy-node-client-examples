# eufy-node-client-examples

This repository shows how to use the [eufy-node-client](https://github.com/JanLoebel/eufy-node-client).

## Getting started
```
# Clone the repository
git clone https://github.com/JanLoebel/eufy-node-client-examples

# Change into the cloned directory
cd eufy-node-client-examples

# Install dependencies
npm install

# Create .env-file via example
cp .env.example .env
```

Edit the `.env`-file and provide `USERNAME` and `PASSWORD`. Now call `node examples/http-read-data/index.js` and wait some time. You should see now more information needed for other examples:
```
P2P_DID <P2P_DID>
ACTOR_ID <ACTOR_ID>
STATION_SN <STATION_SN>
DSK_KEY <DSK_KEY>
```
Take that values and enter them into the `.env`-file.

## Examples

### http-read-data
This example shows how to create the `HttpClient` and calling methods on it. This special examples prints all needed information to start a peer-2-peer connection (see: `p2p-local`).

Execute: `node examples/http-read-data/index.js` 

### p2p-local
In the same network as the base station we can create a `DeviceClientService` after resolving the port with the `LocalLookupService`. With this p2p-connection we can send commands to the base station. In the example we're changing the arm-mode to `HOME`.

Execute: `node examples/p2p-local/index.js` 

### push-logging
To receive push notifications we have to simulate an android device and register at FCM/GCM. We should only register once, so the example saves registered credentials and is reusing them on rerun. After we have credentials we can start listening on FCM/GCM and tell eufy to send push notifications for your account to this credentials.

Execute: `node examples/push-logging/index.js` 

### push-mqtt
This example shows how to forward received push messages to a simple mqtt-broker like `eclipse-mosquitto`. Afterwards you can consume this message with another client (e.g. nodered / iobroker / ...). Please provide the mqtt-broker-url in your `.env`-file. Most of the code is equal to the `push-logging`-example.

Execute: `node examples/push-mqtt/index.js` 

## FAQ

- Does it work also with `eufy (any product name)`?
  - To be honest, I don't know. Currently I only have the wireless doorbell with a base station. Provide me another device and I can see what I can do.

- ...
