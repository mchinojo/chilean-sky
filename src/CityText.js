import "./CityText.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";

function CityText() {
  const [show, setShow] = useState(false);
  const [weatherArray, setWeatherArray] = useState([]);

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
    fetchCityWeather().then(function (response) {
      console.log(response);
      setWeatherArray(response.cityWeather);
    });
  }, []);

  return (
    <div className={`fade-in ${show ? "visible" : ""}`}>
      {show && <h2 className="centered">{weatherArray[2]}</h2>}
    </div>
  );
}

export default CityText;
