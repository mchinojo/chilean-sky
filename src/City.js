import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";
import Card from "react-bootstrap/Card";
import "./City.css";

function City(props) {
  const [show, setShow] = useState(false);
  const [nameArray, setNameArray] = useState([]);
  const [weather, setWeather] = useState();
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
    setShow(false);
    setWeather();
    fetchCityWeather(city).then(function (response) {
      setNameArray(response.cityName);
      console.log(nameArray);
      console.log(response);
      setWeather(response.cityWeather[0]);
      setShow(true);
    });
  }, [city]);

  return (
    <div className="col-10">
      <Card.Subtitle>
        <div className={`title fade-in-title ${show ? "visible-title" : ""}`}>
          {nameArray.slice(1, 5).join(" ")}
        </div>
      </Card.Subtitle>
      <Card.Title>
        <div className={`centered fade-in ${show ? "visible" : ""}`}>
          {show && weather ? weather : ""}
          {show && !weather ? "Despejado" : ""}
        </div>
      </Card.Title>
    </div>
  );
}

export default City;
