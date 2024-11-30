import fs from 'fs';
import client from './dbclient.js';
import bcrypt from 'bcrypt';

async function init_db() {
  try {
    // TODO

    const usersinfo = client.db('cinemadb').collection('users');
    const userlogin = client.db('cinemadb').collection('login');
    const booking = client.db('cinemadb').collection('booking');
    //console.log((await users.countDocuments({})) == 0);
    if ((await usersinfo.countDocuments({})) == 0) {
      fs.readFile('./users.json', 'utf-8', async function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var temp = data;
          var userData = JSON.parse(temp);
          const result = await usersinfo.insertMany(userData, { ordered: true });
          console.log('Added ' + result.insertedCount + ' users');
        }
      });
    }
    if ((await userlogin.countDocuments({})) == 0) {
      fs.readFile('./login.json', 'utf-8', async function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var temp = data;
          var userData = JSON.parse(temp);
          const result = await userlogin.insertMany(userData, { ordered: true });
          console.log('Added ' + result.insertedCount + ' users');
        }
      });
    }
  } catch (err) {
    // TODO
    console.log('Unable to initialize the database!');
  }
}

export async function validate_user(username, password) {
  try {
    if (!(username && password)) {
      return false;
    } else {
      const userlogin = client.db('cinemadb').collection('login');
      const result = await userlogin.findOne({
        $and: [{ username: username }],
      });

      const isMatch = await bcrypt.compare(password, result.password);
      if (result != null && isMatch) {
        return result;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function Record_Payment(username, bookingDetail) {
  try {
    const userlogin = client.db('cinemadb').collection('Payment');
    const result = await userlogin.insertOne({ username: username, bookingDetail: bookingDetail, status: 'success' });
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 userPayment');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 userPayment');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function fetch_transaction(username) {
  try {
    const transaction = client.db('cinemadb').collection('Payment');
    const result = transaction.find({ username: username }).toArray();
    //console.log(result.modifiedCount);
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}

export async function update_login(username, password, enabled) {
  try {
    const userlogin = client.db('cinemadb').collection('login');
    const result = await userlogin.updateOne(
      { username: username },
      { $set: { password: password, role: 'user', enabled: enabled } },
      { upsert: true }
    );
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 userlogin');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 userlogin');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function update_user(username, obj) {
  try {
    const userinfo = client.db('cinemadb').collection('users');

    const result = await userinfo.updateOne({ username: username }, { $set: { obj } }, { upsert: true });
    /*const result = await userinfo.updateOne(
      { username: username },
      { $set: { gender: gender, email: email, birth: birth, nickname: nickname, image: image } },
      { upsert: true }
    );*/
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 userinfo');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 userinfo');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function update_icon(username, image) {
  try {
    const userinfo = client.db('cinemadb').collection('users');

    const result = await userinfo.updateOne(
      { username: username },
      { $set: { 'obj.img': image.img } },
      { upsert: true }
    );
    /*const result = await userinfo.updateOne(
      { username: username },
      { $set: { gender: gender, email: email, birth: birth, nickname: nickname, image: image } },
      { upsert: true }
    );*/
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 userIcon');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 userIcon');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function update_profile(username, obj) {
  try {
    const userinfo = client.db('cinemadb').collection('users');

    const result = await userinfo.updateOne(
      { username: username },
      {
        $set: {
          'obj.nickname': obj.nickname,
          'obj.email': obj.email,
          'obj.gender': obj.gender,
          'obj.birth': obj.birth,
        },
      },
      { upsert: true }
    );
    /*const result = await userinfo.updateOne(
      { username: username },
      { $set: { gender: gender, email: email, birth: birth, nickname: nickname, image: image } },
      { upsert: true }
    );*/
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 Profile');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 Profile');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function fetch_user(username) {
  try {
    const userlogin = client.db('cinemadb').collection('login');
    const result = userlogin.findOne({ username: username });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_userInfo(username) {
  try {
    const userinfo = client.db('cinemadb').collection('users');
    const result = userinfo.findOne({ username: username });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_nickname(nickname) {
  try {
    const userinfo = client.db('cinemadb').collection('users');
    const result = userinfo.findOne({ nickname: nickname });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function username_exist(username) {
  try {
    var result = await fetch_user(username);

    if (result != null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function nickname_exist(nickname) {
  try {
    var result = await fetch_nickname(nickname);

    if (result != null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}

/*export async function fetch_Payment(username) {
  try {
    const userlogin = client.db('cinemadb').collection('Payment');
    const result = userlogin.findOne({ username: username,Date: });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}*/
export async function fetch_profile(username) {
  try {
    const userinfo = client.db('cinemadb').collection('users');
    const result = userinfo.findOne({ username: username });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
init_db().catch(console.dir);

export default {
  validate_user,
  nickname_exist,
  username_exist,
  fetch_nickname,
  fetch_user,
  update_user,
  fetch_profile,
  Record_Payment,
  fetch_transaction,
  fetch_userInfo,
  update_icon,
  update_profile,
};
username_exist('21099757D').then((res) => console.log(res));
//fetch_user('21099757D').then((res) => console.log(res));
//update_user('21099757D', '21099757D', 'user', false).then((res) => console.log(res));
//validate_user('alice', 'ecila').then((res) => console.log(res));
