import express from 'express';
import session from 'express-session';
const app = express();
app.use(
  session({
    secret: 'cinema_eie4432',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

app.use(express.json());
var now = new Date();
var datetime = now.toLocaleString();

app.get('/', (req, res) => {
  res.redirect('/login.html');
});
/*app.get('/', (req, res) => {
  //may error
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/login.html');
  }
});*/

//app.use('/auth', login);

app.use('/', express.static('static'));

app.listen(8080, () => {
  console.log(datetime);
  console.log('Server started at http://127.0.0.1:8080');
});