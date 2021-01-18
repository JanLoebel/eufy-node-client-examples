const dotenv = require('dotenv');
const ipaddr = require('ipaddr.js');

const { CloudLookupService, DeviceClientService, CommandType } = require('eufy-node-client');

dotenv.config();
const P2P_DID = process.env.P2P_DID;
const DSK_KEY = process.env.DSK_KEY;
const ACTOR_ID = process.env.ACTOR_ID;
if (!P2P_DID || !DSK_KEY || !ACTOR_ID) {
  throw new Error(`Please fill in 'P2P_DID' & 'DSK_KEY' & 'ACTOR_ID' values in your .env-file!`);
}

const main = async () => {
  const lookupService = new CloudLookupService();
  try {
    const addresses = await lookupService.lookup(P2P_DID, DSK_KEY);
    console.log('Found addresses', addresses);
    const result = addresses.find(address => ipaddr.parse(address.host).range() === 'private');
    if (!!result) {
      const devClientService = new DeviceClientService(address, P2P_DID, ACTOR_ID);
      await devClientService.connect();

      // CMD_SET_ARMING  # 0 => away 1 => home, 2 => schedule, 63 => disarmed
      devClientService.sendCommandWithInt(CommandType.CMD_SET_ARMING, 1);
    } else {
      console.error('Found addresses do not contain any private address to start P2P...');
    }
  } catch (err) {
    console.error('Not found any address...', err);
  }
};

main();
