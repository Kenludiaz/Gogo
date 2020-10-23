const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const { dirname } = require("path");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const autocomplete = require("autocompleter");

const port = process.env.PORT || 3000;
const API_KEY = process.env.KEY;

app.listen(port, () => {
  console.log(`Listening at port ${port}. `);
  // if (API_KEY == undefined) console.log("Undefined");
  // else console.log("Is Defined.")
});

app.get("/api/:from-:to", async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  // console.log(from, to);
  const API_URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${API_KEY}`;
  console.log(API_URL);
  const data = await fetch(API_URL);
  const jsonData = await data.json();
  console.log(jsonData);
  res.json(jsonData);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
