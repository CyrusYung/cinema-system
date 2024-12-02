//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
import fs from 'fs';
import client from './dbclient.js';
import bcrypt from 'bcrypt';

async function init_db() {
  try {
    // TODO

    const usersinfo = client.db('cinemadb').collection('users');
    const userlogin = client.db('cinemadb').collection('login');
    const booking = client.db('cinemadb').collection('booking');
    const SeatPlan = client.db('cinemadb').collection('seat');
    const Event = client.db('cinemadb').collection('event');
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
export async function fetch_Alltransaction() {
  try {
    const transaction = client.db('cinemadb').collection('Payment');
    const result = transaction.find({}).toArray();
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
export async function delete_ac(username) {
  try {
    const userlogin = client.db('cinemadb').collection('login');
    const userinfo = client.db('cinemadb').collection('users');
    const result = await userlogin.deleteOne({ username: username });
    const result2 = await userinfo.deleteOne({ username: username });
    //console.log(result.modifiedCount);
    if (result.deletedCount == 1) {
      console.log('delete 1 userlogin');
      console.log('delete 1 userinfo');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 userlogin');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function update_status(username, enabled) {
  try {
    const userlogin = client.db('cinemadb').collection('login');

    const result = await userlogin.updateOne(
      { username: username },
      { $set: { role: 'user', enabled: enabled } },
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
export async function insert_seat(username, seat, date, film) {
  try {
    const seatPlan = client.db('cinemadb').collection('seat');
    const result = await seatPlan.insertOne({ username: username, seat: seat, date: date, film: film });
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 seatPlan');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 seatPlan');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function insert_event(title, subtitle, description, dateTo, dateFrom, venue, img) {
  try {
    const Event = client.db('cinemadb').collection('event');
    const result = await Event.insertOne({
      title: title,
      subtitle: subtitle,
      description: description,
      dateTo: dateTo,
      dateFrom: dateFrom,
      venue: venue,
      img: img,
    });
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 Event');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 Event');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function update_event(title, Newtitle, description, dateTo, dateFrom, venue, img) {
  try {
    const Event = client.db('cinemadb').collection('event');
    const result = await Event.updateOne(
      { title: title },
      {
        $set: { title: Newtitle, description: description, dateTo: dateTo, dateFrom: dateFrom, venue: venue, img: img },
      },
      { upsert: true }
    );
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 seatPlan');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 seatPlan');
    }
  } catch (err) {
    console.log('Unable to update the database!');
  }
}
export async function event_exist(title) {
  try {
    var result = await fetch_event(title);

    if (result != null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_event(title) {
  try {
    const Event = client.db('cinemadb').collection('event');
    const result = Event.findOne({ title: title });
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_allevent() {
  try {
    const Event = client.db('cinemadb').collection('event');
    const result = Event.find().toArray();
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_seat(date, film) {
  try {
    const userlogin = client.db('cinemadb').collection('seat');
    const result = userlogin.find({ date: date, film: film }).toArray();
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_ticket(date) {
  try {
    const userlogin = client.db('cinemadb').collection('seat');
    const result = userlogin.find({ date: date }).toArray();
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}

export async function update_seat(username, seat, date) {
  try {
    const seatPlan = client.db('cinemadb').collection('seat');
    const result = await seatPlan.updateOne(
      { username: username },
      { $set: { seat: seat, date: date } },
      { upsert: true }
    );
    //console.log(result.modifiedCount);
    if (result.modifiedCount == 1) {
      console.log('Added 0 seatPlan');
      return true;
    } else if (result.upsertedCount == 1) {
      console.log('Added 1 seatPlan');
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
export async function fetch_alluser(username) {
  try {
    const userinfo = client.db('cinemadb').collection('users');
    const result = userinfo.find().toArray();
    return result;
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export async function fetch_seatInfo(date, filmName, seat) {
  try {
    const Payment = client.db('cinemadb').collection('Payment');
    const result = Payment.find({ Seat: seat });

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
  insert_seat,
  fetch_seat,
  fetch_alluser,
  update_status,
  delete_ac,
  insert_event,
  update_event,
  fetch_allevent,
  fetch_Alltransaction,
  fetch_seatInfo,
};
//username_exist('21099757D').then((res) => console.log(res));

//fetch_user('21099757D').then((res) => console.log(res));
//update_user('21099757D', '21099757D', 'user', false).then((res) => console.log(res));
//validate_user('alice', 'ecila').then((res) => console.log(res));
