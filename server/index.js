const express = require('express');
const { BinanceAPI } = require('./binance.ts');

const app = express();

app.listen(3001, function(){
    console.log("Node Js Server is Running");
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const binanceApiClient = new BinanceAPI();