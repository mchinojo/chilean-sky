const express = require("express");
const axios = require("axios");
const cors = require("cors");
const jsdom = require("jsdom");
const cityJson = require("./components/data/cities.json");
const { JSDOM } = jsdom;

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static("public"));

// Function to fetch local server city weather
function localServerCityWeather(city) {
  const urlData = cityJson[city].urlData;

  return axios
    .get(urlData)
    .then(function (response) {
      const dom = new JSDOM(response.data);
      const tafs = [
        ...dom.window.document.querySelectorAll("div.taf:first-child > .taf_p"),
      ];
      const cityWeatherArray = tafs.map((text) => {
        return text.innerHTML.trim();
      });
      const cityWeather = cityWeatherArray.filter((phrase) => {
        return (
          !phrase.includes(":") &&
          !phrase.includes("Viento") &&
          !phrase.includes("nubes") &&
          phrase.split(" ").length < 3
        );
      });
      console.log(cityWeather);
      return cityWeather;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Function to fetch local server city name
function localServerCityName(city) {
  const urlName = cityJson[city].urlName;

  return axios
    .get(urlName)
    .then(function (response) {
      const dom = new JSDOM(response.data);
      const cityName = dom.window.document
        .querySelector("#ubicacion + td")
        .innerHTML.split("\n")
        .map((text) => {
          return text.trim().replace("<!--<br/>-->", "");
        });

      return cityName;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Function to fetch current image
function fetchCurrentImage(url) {
  return axios
    .get(url)

    .then(function (response) {
      const dom = new JSDOM(response.data);
      const currentImage =
        dom.window.document.querySelectorAll("#imagen_actual")[0].src;
      return axios.get(currentImage, { responseType: "stream" });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Route to fetch current image
app.get("/current-image/:city", function (req, res) {
  const city = req.params.city;
  const urlImage = cityJson[city].urlImage;

  fetchCurrentImage(urlImage)
    .then((axiosResp) => {
      res.set({
        "Content-Type": axiosResp.headers["content-type"],
      });
      axiosResp.data.pipe(res);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error fetching current image.");
    });
});

// Route to fetch city weather and name
app.get("/api/city-weather/:city", async (req, res) => {
  const city = req.params.city;
  console.log(city);
  const cityWeather = await localServerCityWeather(city);
  const cityName = await localServerCityName(city);
  return res.send({ cityWeather, cityName });
});

// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
});
