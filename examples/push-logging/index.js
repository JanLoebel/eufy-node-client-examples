const dotenv = require('dotenv');
const fs = require('fs');
const { PushRegisterService, PushClient, HttpService, sleep } = require('eufy-node-client');

dotenv.config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
if (!USERNAME || !PASSWORD) {
  throw new Error(`Please fill in 'USERNAME' & 'PASSWORD' values in your .env-file!`);
}

const main = async () => {
  console.log('Starting...');

  let credentials = null;
  // Check if credentials are existing
  if (fs.existsSync('credentials.json')) {
    console.log('Credentials found -> reusing them...');
    credentials = JSON.parse(fs.readFileSync('credentials.json').toString());
  } else {
    // Register push credentials
    console.log('No credentials found -> register new...');
    const pushService = new PushRegisterService();
    credentials = await pushService.createPushCredentials();
    // Store credentials
    fs.writeFileSync('credentials.json', JSON.stringify(credentials));

    // We have to wait shortly to give google some time to process the registration
    console.log('Wait a short time (5sec)...');
    await sleep(5 * 1000);
  }

  // Start push client
  const pushClient = await PushClient.init({
    androidId: credentials.checkinResponse.androidId,
    securityToken: credentials.checkinResponse.securityToken,
  });
  pushClient.connect((msg) => {
    console.log('Got push message:', msg);
  });

  // Register at eufy
  const fcmToken = credentials.gcmResponse.token;
  const httpService = new HttpService(USERNAME, PASSWORD);
  await httpService.registerPushToken(fcmToken);
  console.log('Registered at eufy with:', fcmToken);

  setInterval(async () => {
    await httpService.pushTokenCheck();
  }, 30 * 1000);
};

main();
