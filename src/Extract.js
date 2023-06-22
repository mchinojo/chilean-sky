import React, { useState } from "react";
import Gradient from "./Gradient";

const extractPixelColor = (cols, y, x, data) => {
  let pixel = cols * x + y;
  let position = pixel * 4;
  return {
    red: data[position],
    green: data[position + 1],
    blue: data[position + 2],
    alpha: data[position + 3],
  };
};

const pixelsToHex = (cols, y, data) => {
  let c = extractPixelColor(cols, 352, y, data);
  let hexCode = `#${[c.red, c.green, c.blue]
    .map((code) => code.toString(16).padStart(2, "0"))
    .join("")}`;

  return hexCode;
};

function Extract() {
  const [colorArray, setColorArray] = useState([]);
  function defineImage() {
    const canvas = document.getElementById("myCanvas");
    const img = document.getElementById("skyImage");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let cols = canvas.width;
    let exes = [5, 172, 340];
    let colors = exes.map((x) => pixelsToHex(cols, x, data));
    setColorArray(colors);
  }
  return (
    <div>
      <Gradient colors={colorArray}></Gradient>
      <canvas id="myCanvas"></canvas>
      <img
        id="skyImage"
        alt="sky"
        crossOrigin="Anonymous"
        src="/images/20230620122708.jpg"
        // src="https://picsum.photos/704/480"
        onLoad={defineImage}
        style={{ display: "none" }}
      ></img>
    </div>
  );
}
export default Extract;
