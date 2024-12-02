//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
import mongoose from 'mongoose';
var imageSchema = new mongoose.Schema({
  username: String,
  nickname: String,
  email: String,
  gender: String,
  birth: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default imageSchema;
