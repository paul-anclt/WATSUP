const express = require('express');
const { Spot } = require('@binance/connector')

const app = express();

app.listen(3001, function(){
    console.log("Node Js Server is Running");
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// BINANCE /////////////////////////////////////////////////////////////////////////////////////////////////////////

const binanceApiKey = '3tVDks7TYCzNNuhn1s6r1jWpaU4VGZYdeGYasFTsydRwkWhczfg0coPoVZiyp89q'
const binanceApiSecret = 'tvBQ98lY8VxgsgnHTyHp5OEWjgrr3IrJvWCnHyOWN1ZRaYh8DOva21GqdgK29bLh'
const binanceClient = new Spot(binanceApiKey, binanceApiSecret, { baseURL: 'https://testnet.binance.vision'}) // base url for test accounts/keys

// Get account information
app.get('/binanceInfo', (req, res) => {
    binanceClient.account().then(response => {
        binanceClient.logger.log(response.data)
        res.send(response.data)
    })
})

// Place a new order
app.get('/binanceOrder', (req, res) => {
    binanceClient.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
        price: '350',
        quantity: 1,
        timeInForce: 'GTC'
    }).then(response => {
        binanceClient.logger.log(response.data)
        res.send(response.data)
    }).catch(error => binanceClient.logger.error(error))
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////