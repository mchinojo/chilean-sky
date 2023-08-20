const axios = require("axios");
const jsdom = require("jsdom");
const cityJson = require("../../src/components/data/cities.json");

const { JSDOM } = jsdom;

// Function to fetch current image
async function fetchCurrentImage(url) {
  const imagePageResponse = await axios.get(url);
  const dom = new JSDOM(imagePageResponse.data);
  const currentImage =
    dom.window.document.querySelectorAll("#imagen_actual")[0].src;

  return axios.get(currentImage, {
    responseType: "arraybuffer",
  });
}

exports.handler = async (event) => {
  const { city } = event.queryStringParameters;
  const urlImage = cityJson[city].urlImage;

  try {
    const axiosResponse = await fetchCurrentImage(urlImage);

    return {
      statusCode: 200,
      headers: {
        "content-type": axiosResponse.headers["content-type"],
      },
      body: Buffer.from(axiosResponse.data).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: "Error fetching current image.",
    };
  }
};
