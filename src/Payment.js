//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
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
  fetch_transaction,
  insert_seat,
  fetch_seat,
  fetch_ticket,
  fetch_Alltransaction,
  fetch_seatInfo,
} from './userdb.js';

var route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
var form = multer();

route.post('/seat', form.none(), async (req, res) => {
  console.log(req.body.Date);
  var seat = await fetch_seat(req.body.Date, req.body.filmName);
  console.log(seat);
  res.json({
    status: 'success',
    seat: {
      seat: seat,
    },
  });
});

route.get('/ticket', async (req, res) => {
  const d = new Date();
  var day = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  console.log(day);
  var ticket = await fetch_ticket(day);
  res.json({
    status: 'success',
    seat: {
      ticket: ticket,
    },
  });
});
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
    DateofFilm: req.body.DateofFilm,
    FilmName: req.body.FilmName,
    DateofPayment: req.body.DateofPayment,
  };
  Record_Payment(req.session.username, bookingDetail);
  insert_seat(req.session.username, req.body.Seat, req.body.DateofFilm, req.body.FilmName);
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
        FilmName: req.body.FilmName,
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

route.get('/history', async (req, res) => {
  //console.log(req.session.logged);
  console.log(await fetch_transaction(req.session.username));
  if (req.session.logged) {
    var transaction = await fetch_transaction(req.session.username);
    //console.log(transaction);
    res.json({
      status: 'success',
      user: {
        username: req.session.username,
        history: transaction,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

route.post('/seatInfo', form.none(), async (req, res) => {
  //console.log(req.session.logged);
  console.log(req.body.seat);
  var seatInfo = await fetch_seatInfo(req.body.seat);
  console.log(seatInfo);
  //console.log(transaction);
  res.json({
    status: 'success',
    user: {
      seatInfo: { seatInfo },
    },
  });
});

route.get('/Allhistory', async (req, res) => {
  //console.log(req.session.logged);
  console.log(await fetch_Alltransaction(req.session.username));
  if (req.session.logged) {
    var transaction = await fetch_Alltransaction(req.session.username);
    //console.log(transaction);
    res.json({
      status: 'success',
      user: {
        username: req.session.username,
        history: transaction,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});
export default route;
