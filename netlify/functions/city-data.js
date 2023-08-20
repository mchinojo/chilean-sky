const axios = require('axios');
const jsdom = require('jsdom');
const cityJson = require('../../src/components/data/cities.json');

const { JSDOM } = jsdom;

// Function to fetch local server city weather
function localServerCityWeather(cityID) {
  const urlWeather = cityJson[cityID].urlWeather;

  return axios.get(urlWeather).then(function (response) {
    const dom = new JSDOM(response.data);
    const tafs = [
      ...dom.window.document.querySelectorAll('div.taf:first-child > .taf_p'),
    ];
    const cityWeatherArray = tafs.map((text) => {
      return text.innerHTML.trim();
    });

    return cityWeatherArray;
  });
}

exports.handler = async (event) => {
  const { city } = event.queryStringParameters;

  try {
    const cityWeather = await localServerCityWeather(city);

    return {
      statusCode: 200,
      body: JSON.stringify({ cityWeather }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: 'Error fetching city weather.',
    };
  }
};
