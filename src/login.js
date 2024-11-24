import express from 'express';
import multer from 'multer';

import fs from 'fs';
/*import validate_user from './userdb.js';
import fetch_user from './userdb.js';
import fetch_nickname from './userdb.js';
import username_exist from './userdb.js';
import update_user from './userdb.js';
import nickname_exist from './userdb.js';
*/
import { validate_user, nickname_exist, username_exist, fetch_nickname, fetch_user, update_user } from './userdb.js';
//var users = new Map();
var now = new Date();
var datetime = now.toLocaleString();

/*function init_userdb() {
  if (users[0] != null) {
    console.log('something inside');
    return;
  } else {
    fs.readFile('./user.json', 'utf-8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var temp = data;
        var userData = JSON.parse(temp);
        userData.forEach((element) => {
          users.set(element.username, element);
        });
        console.log(users);
      }
    });
  }
}*/

/*function validate_user(username, password) {
  if (fetch_user(username) && password == fetch_user(username).password) {
    return true;
  } else {
    return false;
  }
}*/

var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
var form = multer();

route.post('/login', form.none(), async (req, res, next) => {
  if (req.session.logged) {
    req.session.logged = false;
  }

  if (validate_user(req.body.username, req.body.password)) {
    var currentUser = fetch_user(req.body.username);
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

route.post('/logout', async (req, res, next) => {
  if (req.session.logged == true) {
    req.session.destroy();
    res.end();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
  next();
});

route.get('/me', async (req, res) => {
  if (req.session.logged) {
    var loggedUser = fetch_user(req.session.username);
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

route.post('/register', form.none(), async (req, res, next) => {
  setTimeout(next, 2000);
  console.log(req.body);
  //console.log(users);

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
  } else if (!(req.body.gender == 'male' || req.body.role == 'female')) {
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
      message: 'nickname' + req.body.nickname + 'exists',
    });
  } else if (!req.body.email) {
    res.status(400).json({
      status: 'failed',
      message: 'email cannot be empty',
    });
  } else {
    //export function still bug
    if (update_user(req.body.username, req.body.password, true)) {
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
