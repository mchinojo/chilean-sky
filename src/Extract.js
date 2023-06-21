const extractPixelColor = (cols, x, y, data) => {
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
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
  console.log(hexCode);
};

function Extract() {
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
    let eyes = [338, 180, 5];

    eyes.forEach((y) => pixelsToHex(cols, y, data));
  }
  return (
    <div>
      <canvas id="myCanvas"> </canvas>

      <img
        id="skyImage"
        crossOrigin="Anonymous"
        src="/images/20230620122708.jpg"
        onLoad={defineImage}
        style={{ display: "none" }}
      ></img>
    </div>
  );
}
export default Extract;
