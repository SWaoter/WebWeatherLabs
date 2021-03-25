const express = require('express');
const path = require('path');
const router = express.Router();
const request = require('request');
const weatherDto = require('../model/weather');

const key = '18a225d6e0b17b21515b24abe34af5d4';
const baseApiPath = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/weather/city', async (req, res) => {
  let data = await new Promise((res, rej) =>
    request.get({
      uri: baseApiPath,
      qs: {
        q: req.query.city,
        units: 'metric',
        appid: key
      },
      json: true
    },
      function (error, response, body) {
        res(body);
      }
    ));

  let response = {};

  if (data.cod !== 200) {
    res.status(data.cod);

    response.message = data.message;
  } else {
    response.data = weatherDto.getWeather(data);
  }

  res.send({
    data: [],
    message: "ok",
    ...response
  });
});

router.get('/favourites', (req, res) => {
  res.send({
    data: req.session.favourites || [],
    message: "ok"
  });
});

router.post('/favourites', async (req, res) => {
  let data = await new Promise((res, rej) =>
    request.get({
      uri: baseApiPath,
      qs: {
        q: req.query.city,
        units: 'metric',
        appid: key
      },
      json: true
    },
      function (error, response, body) {
        res(body);
      }
    ));

  let response = {};

  if (data.cod !== 200) {
    response.message = data.message;

    res.status(404);
  } else {
    let fav = req.session.favourites || [];

    if (fav.includes(data.name)) {
      res.status(404);

      response.message = "city already exists";
    } else {
      fav.push(data.name);

      req.session.favourites = fav;
    }
  }

  res.json({
    data: [],
    message: "ok",
    ...response
  });
});

router.get('/weather/coordinates', async (req, res) => {
  let data = await new Promise((res, rej) => request({
    uri: baseApiPath,
    qs: {
      lat: req.query.latitude,
      lon: req.query.longitude,
      units: 'metric',
      appid: key
    },
    json: true,
  },
    function (error, response, body) {
      res(body);
    }
  ));
  let response = {};

  if (data.cod !== 200) {
    res.status(data.cod);

    response.message = data.message;
  } else {
    response.data = weatherDto.getWeather(data);
  }

  res.send({
    data: [],
    message: "ok",
    ...response
  });
});

router.delete('/favourites', async (req, res) => {
  let city = req.query.city;
  let response = {};
  let fav = req.session.favourites || [];
  let oldS = fav.length;

  let ffav = fav.filter(favCity => favCity !== city);

  let newS = ffav.length;

  if (newS !== oldS) {
    req.session.favourites = ffav;
  } else {
    res.status(404);

    response.message = "city not found"
  }

  res.json({
    data: [],
    message: "ok",
    ...response
  });
});

module.exports = router;
