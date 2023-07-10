const express = require("express");
const axios = require("axios");
const cors = require("cors");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static("public"));

// Function to fetch local server city weather
function localServerCityWeather() {
  return axios
    .get("https://aipchile.dgac.gob.cl/metar/SCSN")
    .then(function (response) {
      const dom = new JSDOM(response.data);
      const tafs = [...dom.window.document.querySelectorAll(".taf_p")];
      const cityWeather = tafs.map((text) => {
        return text.innerHTML.trim();
      });
      return cityWeather;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Function to fetch local server city name
function localServerCityName() {
  return axios
    .get("https://aipchile.dgac.gob.cl/designador/SCSN")
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
function fetchCurrentImage(req, res) {
  axios
    .get("https://aipchile.dgac.gob.cl/camara/show/id/40")
    .then(function (response) {
      const dom = new JSDOM(response.data);
      const currentImage =
        dom.window.document.querySelectorAll("#imagen_actual")[0].src;
      axios.get(currentImage, { responseType: "stream" }).then((axiosResp) => {
        res.set({
          "Content-Type": axiosResp.headers["content-type"],
        });
        axiosResp.data.pipe(res);
      });
    });
}

// Route to fetch current image
app.get("/current-image", fetchCurrentImage);

// Route to fetch city weather and name
app.get("/api/city-weather", async (req, res) => {
  const cityWeather = await localServerCityWeather();
  const cityName = await localServerCityName();

  return res.send({ cityWeather, cityName });
});

// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
});
