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
  Record_Payment,
} from './userdb.js';

var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
var form = multer();

route.post('/confirm', form.none(), async (req, res) => {
  //console.log(req.session.username);
  var bookingDetail = {
    kidCount: req.body.kidCount,
    AdultCount: req.body.AdultCount,
    StudentCount: req.body.StudentCount,
    ticketCount: req.body.ticketCount,
    Seat: req.body.Seat,
    Price: req.body.Price,
    CardNumber: req.body.CardNumber,
    Date: req.body.Date,
  };
  Record_Payment(req.session.username, bookingDetail);
  res.json({
    status: 'success',
    user: {
      username: req.session.username,
      bookingDetail: {
        kidCount: req.session.kidCount,
        AdultCount: req.session.AdultCount,
        StudentCount: req.session.StudentCount,
        ticketCount: req.session.ticketCount,
        Seat: req.session.Seat,
        Price: req.session.totalPrice,
      },
    },
  });
});

route.get('/success', async (req, res) => {
  //console.log(req.session);
  res.json({
    status: 'success',
    user: {
      username: req.session.username,
      /*kidCount: req.body.kidCount,
      AdultCount: req.body.AdultCount,
      StudentCount: req.body.StudentCount,
      ticketCount: req.body.ticketCount,
      Seat: req.body.Seat,
      Price: req.body.totalPrice,*/
    },
  });
});

export default route;
