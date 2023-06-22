const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const PORT = 8080;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(cors());
app.use(express.static("public"));

app.get("/current-image", function (req, res) {
  axios
    .get("https://aipchile.dgac.gob.cl/camara/show/id/40")
    .then(function (response) {
      const dom = new JSDOM(response.data);
      const currentImage =
        dom.window.document.querySelectorAll("#imagen_actual")[0].src;
      axios.get(currentImage, { responseType: "stream" }).then((axiosResp) => {
        res.set({
          "Content-Type": axiosResp.headers["content-type"],
        });
        axiosResp.data.pipe(res);
      });
    });
});

// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
});
