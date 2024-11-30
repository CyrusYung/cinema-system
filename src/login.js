import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import imgSchema from './model.js';
import {
  validate_user,
  nickname_exist,
  username_exist,
  fetch_nickname,
  fetch_user,
  update_user,
  update_login,
  fetch_profile,
} from './userdb.js';
//var users = new Map();
var now = new Date();
var datetime = now.toLocaleString();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
var form = multer();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

route.post('/login', form.none(), async (req, res, next) => {
  if (req.session.logged) {
    req.session.logged = false;
  }

  if (await validate_user(req.body.username, req.body.password)) {
    var currentUser = await fetch_user(req.body.username);
    //console.log(currentUser);
    if (currentUser.enabled == false) {
      res.status(401).json({
        status: 'failed',
        message: 'User `' + currentUser.username + '` is currently disabled',
      });
    } else if (currentUser.enabled == true) {
      req.session.username = currentUser.username;
      req.session.role = currentUser.role;
      req.session.logged = true;
      req.session.timestamp = datetime;
      res.json({
        status: 'success',
        user: {
          username: currentUser.username,
          role: currentUser.role,
        },
      });
    }
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Incorrect username and password',
    });
  }
  next();
});

route.post('/logout', async (req, res) => {
  if (req.session.logged == true) {
    req.session.destroy();
    res.end();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

route.get('/me', async (req, res) => {
  if (req.session.logged) {
    var loggedUser = await fetch_user(req.session.username);

    res.json({
      status: 'success',
      user: {
        username: req.session.username,
        role: loggedUser.role,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

route.get('/nav', async (req, res) => {
  if (req.session.logged) {
    var userinfo = await fetch_profile(req.session.username);
    //console.log(userinfo.obj.img);
    res.json({
      status: 'success',
      user: { username: req.session.username, icon: userinfo.obj.img },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});
/*async function update_user(username, password, role) {
  users.set(username, { username: username, password: password, role: role, enabled: true });
  var userjson = [];
  users.forEach((element) => {
    userjson.push(element);
  });
  var temp = JSON.stringify(userjson, null, 2);
  fs.writeFile('./user.json', temp, function (err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log('File written successfully\n');
      console.log(fs.readFileSync('./user.json', 'utf8'));
      return true;
    }
  });
}*/

route.post('/register', upload.single('image'), async (req, res, next) => {
  setTimeout(next, 2000);
  console.log(req.body);
  //console.log(users);
  const hash = await bcrypt.hash(req.body.password, 10);
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var obj = {
    nickname: req.body.nickname,
    email: req.body.email,
    gender: req.body.gender,
    birth: req.body.birth,
    img: {
      data: req.file,
      contentType: 'image/png',
    },
  };
  //imgSchema.create(obj);
  if (!req.body.username || !req.body.password || !req.body.Repassword) {
    res.status(400).json({
      status: 'failed',
      message: 'Missing fields',
    });
  }

  if (req.body.username.length < 3) {
    res.status(400).json({
      status: 'failed',
      message: 'Username must be at least 3 characters',
    });
  } else if (await username_exist(req.body.username)) {
    res.status(400).json({
      status: 'failed',
      message: 'Username ' + req.body.username + ' already exists',
    });
  } else if (req.body.password.length < 8) {
    res.status(400).json({
      status: 'failed',
      message: 'Password must be at least 8 characters',
    });
  } else if (!(req.body.gender == 'male' || req.body.gender == 'female')) {
    res.status(400).json({
      status: 'failed',
      message: 'Gender can only be either `male` or `female`',
    });
  } else if (!req.body.birth) {
    res.status(400).json({
      status: 'failed',
      message: 'Date of birth cannot be empty',
    });
  } else if (!req.body.nickname) {
    res.status(400).json({
      status: 'failed',
      message: 'nickname cannot be empty',
    });
  } else if (await nickname_exist(req.body.nickname)) {
    res.status(400).json({
      status: 'failed',
      message: 'nickname `' + req.body.nickname + '` exists',
    });
  } else if (!req.body.email) {
    res.status(400).json({
      status: 'failed',
      message: 'email cannot be empty',
    });
  } else if (!req.body.email.match(emailFormat)) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid email format',
    });
  } else {
    if (update_login(req.body.username, hash, true) && update_user(req.body.username, obj)) {
      res.json({
        status: 'success',
        user: {
          username: req.body.username,
          role: req.body.role,
        },
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Account created but unable to save into the database',
      });
    }
  }
  next();
});
export default route;
