import axios from "axios";

function fetchCityWeather(city) {
  return axios
    .get(`/.netlify/functions/city-data?city=${city}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default fetchCityWeather;
