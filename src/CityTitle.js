import "./CityTitle.css";
import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";

function CityTitle() {
  const [show, setShow] = useState(false);
  const [nameArray, setNameArray] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    fetchCityWeather().then(function (response) {
      setNameArray(response.cityName);
    });
  }, []);

  return (
    <div className={`fade-in ${show ? "visible" : ""}`}>
      {show && <h1 className="title">{nameArray[1]}</h1>}
    </div>
  );
}

export default CityTitle;
