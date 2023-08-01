import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";
import Card from "react-bootstrap/Card";
import cities from "./components/data/cities.json";
import "./City.css";

const weatherOptions = [
  "Neblina",
  "Nublado",
  "Bruma",
  "Bancos de Niebla",
  "Niebla",
  "Nubosidad parcial",
  "Escasa nubosidad",
  "Cubierto",
  "Lluvia",
  "Débil Lluvia",
  "Débil ChubascosLluvia",
];

function City(props) {
  const [show, setShow] = useState(false);
  const [showLocation, setShowLocation] = useState([]);
  const [weather, setWeather] = useState();
  const city = props.city;
  const cityJson = cities[city];

  useEffect(() => {
    setShow(false);
    setWeather();
    fetchCityWeather(city).then(function (response) {
      console.log("La data de ", city, "es ", response);

      const weatherString = response.cityWeather.join();
      const matchedWeather = weatherOptions.find((option) =>
        weatherString.includes(option)
      );

      setShowLocation(cityJson.location);

      setWeather(matchedWeather ? matchedWeather : ["Despejado"]);
      setShow(true);
    });
  }, [city]);

  return (
    <div className="col-10">
      <Card.Subtitle>
        <div className={`title fade-in-title ${show ? "visible-title" : ""}`}>
          {showLocation}
        </div>
      </Card.Subtitle>
      <Card.Title>
        <div className={`centered fade-in ${show ? "visible" : ""}`}>
          {show && weather ? weather : ""}
          {show && !weather ? "" : ""}
        </div>
      </Card.Title>
    </div>
  );
}

export default City;
