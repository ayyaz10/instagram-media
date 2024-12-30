import express from "express";
import fetch from "node-fetch";
import serverless from "serverless-http";
import "dotenv/config";

const app = express();

const urlBase = `https://${process.env.APIHOST}/get-info-rapidapi`;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.APIKEY,
    "x-rapidapi-host": process.env.APIHOST,
  },
};

app.get("/get-insta", async (req, res) => {
  try {
    const queryUrl = encodeURIComponent(
      "https://www.instagram.com/p/DEDENanARo6/?utm_source=ig_web_copy_link"
    );
    const response = await fetch(`${urlBase}?url=${queryUrl}`, options);
    const result = await response.json();
    res.json(result || { message: "No data found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Export for Netlify Functions
module.exports.handler = serverless(app);
