import React, { useState, useEffect } from "react";
import Gradient from "./Gradient";
import fetchCityWeather from "./fetchCityWeather";
import cities from "./components/data/cities.json";

const getPixelColor = (imageWidth, x, y, pixelData) => {
  let pixelIndex = imageWidth * y + x;
  let position = pixelIndex * 4;
  return {
    red: pixelData[position],
    green: pixelData[position + 1],
    blue: pixelData[position + 2],
    alpha: pixelData[position + 3],
  };
};

const getHexCodeFromPixels = (imageWidth, y, pixelData) => {
  let pixelColor = getPixelColor(imageWidth, imageWidth / 2, y, pixelData);
  let hexCode = `#${[pixelColor.red, pixelColor.green, pixelColor.blue]
    .map((code) => code.toString(16).padStart(2, "0"))
    .join("")}`;

  return hexCode;
};

function Extract({ city }) {
  const [colorArray, setColorArray] = useState([]);

  function handleImageLoad() {
    const canvas = document.getElementById("myCanvas");
    const img = document.getElementById("skyImage");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    let imageWidth = canvas.width;
    let yValues = cities[city].yValues;
    let colors = yValues.map((y) =>
      getHexCodeFromPixels(imageWidth, y, pixelData)
    );
    setColorArray(colors);
  }

  useEffect(() => {
    fetchCityWeather(city).then(function (response) {
      const colors = response.colors;
      setColorArray(colors);
    });
  }, [city]);

  return (
    <div>
      <Gradient colors={colorArray}></Gradient>
      <canvas id="myCanvas" style={{ display: "none" }}></canvas>
      <img
        id="skyImage"
        alt="sky"
        crossOrigin="Anonymous"
        src={`http://localhost:8080/current-image/${city}`}
        // src="https://picsum.photos/704/480"
        onLoad={handleImageLoad}
        style={{ display: "none" }}
      ></img>
    </div>
  );
}
export default Extract;
