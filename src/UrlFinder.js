const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

axios
  .get("https://aipchile.dgac.gob.cl/camara/show/id/40")
  .then(function (response) {
    const dom = new JSDOM(response.data);
    const currentImage =
      dom.window.document.querySelectorAll("#imagen_actual")[0].src;
  });
