import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';
const connect_uri = config.CONNECTION_STR;
const client = new MongoClient(connect_uri, {
  connectTimeoutMS: 2000,
  serverSelectionTimeoutMS: 2000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
var now = new Date();
var datetime = now.toLocaleString();
async function connect() {
  try {
    // TODO
    await client.connect();
    client.db('cinemadb').command({ ping: 1 });
    console.log(datetime);
    console.log('Server started at http://127.0.0.1:8080');
    console.log('Successfully connected to the database!');
  } catch (err) {
    // TODO
    console.log(err);
    console.log('Unable to establish connection to the database!');
    process.exit(1);
  }
}
connect().catch(console.dir);
export default client;
