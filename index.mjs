import express from "express";
import fetch from "node-fetch";

import "dotenv/config";

const app = express();
const PORT = 5000;

const url = `https://${APIHOST}/get-info-rapidapi?url=https%3A%2F%2Fhttps://www.instagram.com/p/DEDENanARo6/?utm_source=ig_web_copy_link`;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.APIKEY,
    "x-rapidapi-host": process.env.APIHOST,
  },
};

// Route to trigger the Instagram API call
app.get("/get-insta", async (req, res) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parsing as JSON
    res.json(result || { message: "No data found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server with error handling
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
