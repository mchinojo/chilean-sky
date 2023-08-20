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


  const getCurrentTimeOfDay = () => {
    const chileTime = new Date().toLocaleString("en-US", { timeZone: "America/Santiago" });
    const currentHour = new Date(chileTime).getHours();
    return currentHour >= 8 && currentHour < 19 ? "morning" : "night";
  };

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
  }, [city, cityJson.location]);

  return (
    <div className={`${getCurrentTimeOfDay()}`}>
      <Card.Subtitle>
        <div className={`location-text location-fade-in ${show ? "location-visible" : ""}`}>
          {showLocation}
        </div>
      </Card.Subtitle>
      <Card.Title>
        <div className={`weather-text weather-fade-in ${show ? "weather-visible" : ""}`}>
          {show && weather ? weather : ""}
          {show && !weather ? "" : ""}
        </div>
      </Card.Title>
    </div>
  );
}

export default City;
