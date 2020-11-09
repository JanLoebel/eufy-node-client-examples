const dotenv = require('dotenv');
const { LocalLookupService, DeviceClientService, CommandType } = require('eufy-node-client');

dotenv.config();
const LOCAL_STATION_IP = process.env.LOCAL_STATION_IP;
const P2P_DID = process.env.P2P_DID;
const ACTOR_ID = process.env.ACTOR_ID;
if (!LOCAL_STATION_IP || !P2P_DID || !ACTOR_ID) {
  throw new Error(`Please fill in 'LOCAL_STATION_IP' & 'P2P_DID' & 'ACTOR_ID' values in your .env-file!`);
}

const main = async () => {
  const lookupService = new LocalLookupService();
  const address = await lookupService.lookup(LOCAL_STATION_IP);
  console.log('Found address', address);

  const devClientService = new DeviceClientService(address, P2P_DID, ACTOR_ID);
  await devClientService.connect();

  // CMD_SET_ARMING  # 0 => away 1 => home, 2 => schedule, 63 => disarmed
  devClientService.sendCommandWithInt(CommandType.CMD_SET_ARMING, 1);
};

main();
