import "./CityName.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";

function CityName() {
  const [show, setShow] = useState(false);
  const [nameArray, setNameArray] = useState([]);

  // this city should come from react router
  const city = "santo-domingo";

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
    });
  }, []);

  return (
    <div className={`title fade-in-title ${show ? "visible-title" : ""}`}>
      {nameArray.slice(1, 5).join(" ")}
    </div>
  );
}

export default CityName;
