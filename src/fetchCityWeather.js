import axios from "axios";

function fetchCityWeather() {
  return axios
    .get("http://localhost:8080/api/city-weather")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default fetchCityWeather;
