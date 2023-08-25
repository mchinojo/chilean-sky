import React, { useState, useEffect } from "react";
import fetchCityWeather from "./fetchCityWeather";
import cities from "./components/data/cities.json";
import Card from "react-bootstrap/Card";
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

// hex color to number
// const colorNumber = parseInt("#3f5da2".replace("#", "0x"), 16)
// complementary number
// const complementNumber = 0xffffff ^ colorNumber;
// hex number to hex color
// const complementColor = `#${Number(complementNumber).toString(16)}`

function City(props) {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  const city = props.city;
  const colors = props.colors;
  const cityJson = cities[city];

  // Define the function to get text color based on background color
  const getContrastColor = (colors, index) => {
    if (!colors || !colors[index]) {
      console.log("Invalid color or index:", colors, index);
      return "blanchedalmond"; // Default color if colors or selected index is undefined
    }

    const hexColor = colors[index];
    const colorValue = parseInt(hexColor.replace("#", "0x"), 16);
    console.log("Hex Color:", hexColor);
    console.log("Color Value:", colorValue);

    return colorValue > 0xffffff / 2 ? "#36454F" : "#F9F6EE";
  };

  // const getCurrentTimeOfDay = () => {
  //   const chileTime = new Date().toLocaleString("en-US", {
  //     timeZone: "America/Santiago",
  //   });
  //   const currentHour = new Date(chileTime).getHours();
  //   return currentHour >= 9 && currentHour < 19 ? "morning" : "night";
  // };

  useEffect(() => {
    setShow(false); // Hide content
    // setWeather("");
    // setLocation("");

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
    <div>
      <Card.Subtitle>
        <div
          className={`location-text ${
            show ? "fade-in opacity-visible" : "fade-out opacity-invisible"
          }`}
          style={{ color: getContrastColor(colors, 0) }}
        >
          {location}
        </div>
      </Card.Subtitle>
      <Card.Title>
        <div
          className={`weather-text  ${
            show ? "fade-in opacity-visible" : "fade-out opacity-invisible"
          }`}
          style={{ color: getContrastColor(colors, 1) }}
        >
          {weather}
        </div>
      </Card.Title>
      <h5>{colors[0]}</h5>
    </div>
  );
}

export default City;
