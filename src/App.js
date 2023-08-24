import "./App.css";
import Gradient from "./Gradient";
import CityButtons from "./CityButtons";
import City from "./City";
import Card from "react-bootstrap/Card";
import cities from "./components/data/cities.json";
import { useState } from "react";

const getHexCodeFromPixels = (imageWidth, y, pixelData) => {
  let pixelColor = getPixelColor(imageWidth, imageWidth / 2, y, pixelData);
  let hexCode = `#${[pixelColor.red, pixelColor.green, pixelColor.blue]
    .map((code) => code.toString(16).padStart(2, "0"))
    .join("")}`;

  return hexCode;
};

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

function App() {
  const [selectedCity, setSelectedCity] = useState("santo-domingo");
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
    let yValues = cities[selectedCity].yValues;
    let colors = yValues.map((y) =>
      getHexCodeFromPixels(imageWidth, y, pixelData)
    );
    setColorArray(colors);
  }

  const onClickCityButtons = (cityID) => {
    setSelectedCity(cityID);
  };

  return (
    <div className="App">
      <Gradient colors={colorArray}></Gradient>
      <canvas id="myCanvas" style={{ display: "none" }}></canvas>
      <img
        id="skyImage"
        alt="sky"
        crossOrigin="Anonymous"
        src={`http://localhost:8080/current-image/${selectedCity}`}
        // src="https://picsum.photos/704/480"
        onLoad={handleImageLoad}
        style={{ display: "none" }}
      ></img>

      <Card>
        <Card.Body>
          <div className="row">
            <City city={selectedCity} colors={colorArray}></City>
            <div className="buttons col-2">
              <CityButtons onClickCityButtons={onClickCityButtons} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
