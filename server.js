const express = require("express");
const app = express();

const HOST = "bigdaddy-goagames-tiranga-91club-trx-api-with-result.p.rapidapi.com";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.send("TRX Backend is running!");
});

app.get("/api/results", async (req, res) => {
  try {
    const response = await fetch(
      `https://${HOST}/api/v1/wingoresult/type/30`,
      {
        headers: {
          "X-RapidAPI-Host": HOST,
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY
        }
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(process.env.PORT || 3000);
