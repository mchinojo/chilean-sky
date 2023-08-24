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
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  const city = props.city;
  const cityJson = cities[city];

  const getCurrentTimeOfDay = () => {
    const chileTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Santiago",
    });
    const currentHour = new Date(chileTime).getHours();
    return currentHour >= 9 && currentHour < 19 ? "morning" : "night";
  };

  useEffect(() => {
    setShow(false); // Hide content
    setWeather("");
    setLocation("");

    fetchCityWeather(city).then(function (response) {
      console.log("La data de ", city, "es ", response);

      const weatherString = response.cityWeather.join();
      const matchedWeather = weatherOptions.find((option) =>
        weatherString.includes(option)
      );

      setLocation(cityJson.location);

      setWeather(matchedWeather ? matchedWeather : "Despejado");
      // Show content after a delay
      setShow(true);
    });
  }, [city, cityJson.location]);

  return (
    <div className={`${getCurrentTimeOfDay()}`}>
      <Card.Subtitle>
        <div
          className={`location-text ${
            show ? "fade-in opacity-visible" : "opacity-invisible"
          }`}
        >
          {location}
        </div>
      </Card.Subtitle>
      <Card.Title>
        <div
          className={`weather-text  ${
            show ? "fade-in opacity-visible" : "opacity-invisible"
          }`}
        >
          {show ? weather : ""}
        </div>
      </Card.Title>
    </div>
  );
}

export default City;
