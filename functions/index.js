const express = require("express");
const fetch = require("node-fetch");
const ServerlessHttp = require("serverless-http");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const urlBase = `https://${process.env.APIHOST}/get-info-rapidapi`;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.APIKEY,
    "x-rapidapi-host": process.env.APIHOST,
  },
};

app.get("/.netlify/functions/index/get-insta", async (req, res) => {
  const { type, link } = req.body;
  try {
    // const queryUrl = encodeURIComponent(
    //   "https://www.instagram.com/p/DEDENanARo6/?utm_source=ig_web_copy_link"
    // );
    const queryUrl = encodeURIComponent(link);
    const response = await fetch(`${urlBase}?url=${queryUrl}`, options);
    const result = await response.json();
    res.json(result || { message: "No data found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/.netlify/functions/index", (req, res) => {
  res.send("Hello, World!");
});

// Export for Netlify Functions
const handler = ServerlessHttp(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
