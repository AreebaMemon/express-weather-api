const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.city;
  const aipKey = "5a591055c7d71534875fd51d6dfcf9d8";
  const unit = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query +",pk&appid=" +aipKey +"&units=" +unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.write(`
  <style>
    body {
      background: #ff7a57;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
      background-color: #ffffff;
      border: 1px solid #ff7a57;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 6px rgba(255, 122, 87, 0.3);
      max-width: 400px;
      width: 100%;
    }

    .weather-info {
      color: #ff7a57;
      padding: 10px 0;
      font-size: 1.2rem;
      border-bottom: 1px solid #ffd3c7;
      text-align: left;
      width: 100%;
    }

    .weather-info:last-child {
      border-bottom: none;
    }
  </style>
`);


    
      res.write(`
  <div class="container">
    <p class='weather-info'>Temperature: ${weatherData.main.temp} &#176;C</p>
    <p class='weather-info'>Weather: ${weatherData.weather[0].description}</p>
    <p class='weather-info'>Pressure: ${weatherData.main.pressure} hPa</p>
    <p class='weather-info'>Country Code: ${weatherData.sys.country}</p>
    <p class='weather-info'>City Name: ${weatherData.name}</p>
  </div>
`);


      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server Listen on 3000 port");
});
