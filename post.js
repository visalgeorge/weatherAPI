const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '3927e3c605458175192573d2b4dfe594';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weatherText = `It's ${weather.main.temp} degree celsius in ${weather.name}!`;
      res.render('index', {weather: weatherText, error: null});
    }
  }
});
})

app.listen(7002, function () {
console.log('Ready for checking weather in your location ')
})
