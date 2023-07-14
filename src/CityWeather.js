import "./CityWeather.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";

function CityWeather(props) {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState();
  const city = props.city;

  useEffect(() => {
    setShow(false);
    setWeather();

    console.log("Fetching data...");
    fetchCityWeather(city).then(function (response) {
      console.log(response);
      setWeather(response.cityWeather[0]);
      setShow(true);
    });
  }, [city]);

  return (
    <div className={`centered fade-in ${show ? "visible" : ""}`}>
      {show && weather ? weather : ""}
      {show && !weather ? "Despejado" : ""}
    </div>
  );
}

export default CityWeather;
