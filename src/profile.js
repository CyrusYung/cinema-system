import express from 'express';
import multer from 'multer';

import {
  validate_user,
  nickname_exist,
  username_exist,
  fetch_nickname,
  fetch_user,
  update_user,
  update_login,
} from './userdb.js';

var now = new Date();
var datetime = now.toLocaleString();

var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/profile', (req, res) => {});
