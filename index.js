const express = require('express');
const fetch = require('node-fetch')
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');

const port = process.env.PORT || 3000;
const API_KEY = process.env.KEY;

app.listen(port, () => {
    console.log(`Listening at port ${port}. `,);
    // if (API_KEY == undefined) console.log("Undefined");
    // else console.log("Is Defined.")
})

app.get('/api', async (req, res) => {
    try {
        const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`;
        const data = await fetch(API_URL);
        const jsonData = await data.json();
        // console.log(jsonData);

    }
    catch(e) {
        console.log(e);
    }
})


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());