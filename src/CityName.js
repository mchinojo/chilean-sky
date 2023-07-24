import "./CityName.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";

function CityName(props) {
  const [show, setShow] = useState(false);
  const [nameArray, setNameArray] = useState([]);
  const city = props.city;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    fetchCityWeather(city).then(function (response) {
      setNameArray(response.cityName);
      console.log(nameArray);
    });
  }, [city]);

  return (
    <div className={`title fade-in-title ${show ? "visible-title" : ""}`}>
      {nameArray.slice(1, 5).join(" ")}
    </div>
  );
}

export default CityName;
