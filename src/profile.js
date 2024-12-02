//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import path from 'path';
import {
  validate_user,
  nickname_exist,
  username_exist,
  fetch_nickname,
  fetch_user,
  update_user,
  update_login,
  fetch_userInfo,
  update_icon,
  update_profile,
  fetch_alluser,
  update_status,
  delete_ac,
} from './userdb.js';

var now = new Date();
var datetime = now.toLocaleString();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var form = multer();
var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

route.get('/profile', async (req, res) => {
  var profile = await fetch_userInfo(req.session.username);
  var login = await fetch_user(req.session.username);
  res.json({
    status: 'success',
    user: {
      username: req.session.username,
      profile: profile,
      login: login,
    },
  });
});

route.post('/status', form.none(), async (req, res) => {
  var data = JSON.parse(req.body.enabled);
  var status = await update_status(req.body.username, data);
  res.json({
    status: 'success',
    user: {
      username: req.body.username,
      enabled: req.body.enabled,
    },
  });
});

route.post('/delete', form.none(), async (req, res) => {
  var deleteAC = await delete_ac(req.body.username);
  res.json({
    status: 'success',
    user: {
      username: req.body.username,
    },
  });
});

route.get('/manage', async (req, res) => {
  var profile = await fetch_alluser();
  res.json({
    status: 'success',
    user: {
      profile: profile,
    },
  });
});

//get updated image
route.post('/icon', upload.single('image'), async (req, res) => {
  var image = {
    img: {
      data: req.file,
      contentType: 'image/png',
    },
  };

  if (update_icon(req.session.username, image)) {
    res.json({
      status: 'success',
      user: {
        username: req.body.username,
        image: image,
      },
    });
  } else {
    res.status(500).json({
      status: 'failed',
      message: 'Account created but unable to save into the database',
    });
  }
});

route.post('/pw', form.none(), async (req, res) => {
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 10);
  if (!req.body.password || !req.body.Repassword) {
    res.status(400).json({
      status: 'failed',
      message: 'Missing fields',
    });
  } else if (req.body.password.length < 8) {
    res.status(400).json({
      status: 'failed',
      message: 'Password must be at least 8 characters',
    });
  } else {
    if (update_login(req.session.username, hash, true)) {
      res.json({
        status: 'success',
        user: {
          username: req.body.username,
          hash: hash,
        },
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Account created but unable to save into the database',
      });
    }
  }
});

route.post('/update', form.none(), async (req, res, next) => {
  setTimeout(next, 2000);
  //console.log(req.body);
  //console.log(users);

  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var obj = {
    nickname: req.body.nickname,
    email: req.body.email,
    gender: req.body.gender,
    birth: req.body.birth,
  };
  //imgSchema.create(obj);
  if (!req.body.username) {
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
    //console.log('hi');
    if (await update_profile(req.session.username, obj)) {
      res.json({
        status: 'success',
        user: {
          username: req.body.username,
          obj: obj,
        },
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Account created but unable to save into the database',
      });
    }
  }
});

export default route;
