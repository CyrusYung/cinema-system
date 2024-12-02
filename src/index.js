//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
import express from 'express';
import session from 'express-session';
import login from './login.js';
import mongostore from 'connect-mongo';
import client from './dbclient.js';
import Payment from './Payment.js';
import Profile from './profile.js';
import Event from './event.js';
const app = express();
app.use(
  session({
    secret: 'cinema_eie4432',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    store: mongostore.create({
      client,
      dbName: 'cinemadb',
      collectionName: 'session',
    }),
  })
);

app.use(express.json());
var now = new Date();
var datetime = now.toLocaleString();

app.get('/', (req, res) => {
  //may error
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/login.html');
  }
});

app.use('/user', Profile);
app.use('/event', Event);
app.use('/pay', Payment);
app.use('/auth', login);

app.use('/', express.static('static'));

app.listen(8080, () => {
  console.log(datetime);
  console.log('Server started at http://127.0.0.1:8080');
});
