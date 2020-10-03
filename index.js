const express = require('express');
const fetch = require('node-fetch')
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');

const port = process.env.PORT || 3000;
const API_KEY = process.env.KEY;

app.listen(port, () => {
    console.log(`Listening at port ${port}. `);
})

app.get('/', async (req, res) => {
    try {
        res.send('./index.html');
        const API_URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=${API_KEY}`;
        const data = await fetch(API_KEY);
        const jsonData = data.json();
        console.log(jsonData);

    }
    catch(e) {
        console.log(e);
    }
})


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());