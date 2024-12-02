//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.CONNECTION_STR) {
  console.log('CONNECTION_STR is not defined');
  process.exit(1);
}
export default {
  // Export variable here
  CONNECTION_STR: process.env.CONNECTION_STR,
};
