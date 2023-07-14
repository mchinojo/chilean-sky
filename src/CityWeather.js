import "./CityWeather.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";
import cities from "./components/data/cities.json";

function CityWeather() {
  const [show, setShow] = useState(false);
  const [weatherArray, setWeatherArray] = useState(null);
  // need to link my json file data to this
  const city = "santo-domingo";

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    console.log("Fetching data...");
    fetchCityWeather(city).then(function (response) {
      console.log(response);
      setWeatherArray(response.cityWeather);
    });
  }, [city]);

  return (
    <div className={`centered fade-in ${show ? "visible" : ""}`}>
      {show && weatherArray && weatherArray.length > 0
        ? weatherArray[0]
        : "Despejado"}
    </div>
  );
}

export default CityWeather;
