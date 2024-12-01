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
  insert_event,
  event_exist,
  update_event,
} from './userdb.js';

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

route.post('/insert', upload.single('image'), async (req, res) => {
  if (await event_exist(req.body.title)) {
    res.status(400).json({
      status: 'failed',
      message: 'Title ' + req.body.title + ' already exists',
    });
  }
  var event = await insert_event(req.body.title, req.body.description, req.body.date, req.body.venue, {
    data: req.file,
    contentType: 'image/png',
  });
  res.json({
    status: 'success',
    user: {
      username: req.session.username,
      description: req.body.description,
      date: req.body.date,
      venue: req.body.venue,
      image: req.body.image,
    },
  });
});

route.post('/update', upload.single('image'), async (req, res) => {
  var event = await update_event(req.body.title, req.body.description, req.body.date, req.body.venue, {
    data: req.file,
    contentType: 'image/png',
  });
  res.json({
    status: 'success',
    user: {
      username: req.session.username,
      description: req.body.description,
      date: req.body.date,
      venue: req.body.venue,
      image: req.body.image,
    },
  });
});

export default route;
