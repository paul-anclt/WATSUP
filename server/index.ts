const express = require('express');
const router = express.Router()
const app = express();
const cors = require('cors');
const bp = require('body-parser')
var XMLHttpRequest = require('xhr2');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors(corsOptions));

const bcrypt = require('bcrypt');
const { Client } = require('pg');
import { BinanceAPI } from "./binance";
import { KrakenAPI, KrakenPublic } from "./kraken";
var krakenito = new KrakenPublic()
var krakenita = new KrakenAPI("key","secret")
const binance_1 = require("./binance")
const binancito = new BinanceAPI()
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'postgres'
})

client.connect()


app.listen(3001, function(){
    console.log("Node Js Server is Running");

})

app.post('/login', async (req: any, res: any) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    })

    if (result.rows.length === 0) {
        res.status(401).json({
            message: 'user doesnt exist'
        })
        return
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e
    const user = result.rows[0]

    if (await bcrypt.compare(password, user.password)) {
        // alors connecter l'utilisateur
        //req.session.userId = user.id
        res.json({
            id: user.iduser,
            email: user.email
        })
    } else {
        res.status(401).json({
            message: 'bad password'
        })
        return
    }
})

app.post('/register', async (req: any, res: any) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    })

    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'user already exists'
        })
        return
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e

    const hash = await bcrypt.hash(password, 10)

    await client.query({
        text: `INSERT INTO utilisateur(email, password)
    VALUES ($1, $2)
    `,
        values: [email, hash]
    })
    return res.json({ok:true});
    
})

app.get('/userConnections/:id',async (req: any, res: any) => {
    const idUser = req.params.id

    const result = await client.query({
        text: 'SELECT * FROM connecter WHERE iduser=$1',
        values: [idUser]
    })

    res.json(result.rows)
});

app.get('/plateformes', async(req: any, res: any) => {
    const result = await client.query({
        text: 'SELECT * FROM plateforme'
    })

    res.json(result.rows)
})

app.post('/addConnection', async(req: any, res: any) => {
    const idPlateforme = req.body.idPlateforme
    const idUser = req.body.idUser
    const publicToken = req.body.publicToken
    const privateToken = req.body.privateToken

    await client.query({
        text: `INSERT INTO public.connecter(idplateforme, iduser, publictoken, privatetoken)
            VALUES ($1, $2, $3, $4);
    `,
        values: [idPlateforme, idUser, publicToken, privateToken]
    })
    return res.json({ok:true});
})

app.get('/getAssetsInfo/:asset', async(req: any, res: any) => {
    const asset = req.params.asset
    var informations = await krakenito.getAssetsInfo(asset)
    res.send(informations)
})
app.get('/userPlateformes/:id', async(req: any, res: any) => {
    const idUser = req.params.id;
    const result = await client.query({
        text: 'SELECT nomplateforme FROM plateforme WHERE idplateforme in (select idplateforme from connecter where iduser=$1)',
        values: [idUser]
    });
    res.json(result.rows);
});

app.get('/getBalanceInfo', async(req: any, res: any) => {
    var balance = await binancito.balance();
    res.send(balance);
});
app.get('/getOrderBook/:asset', async(req: any, res: any) => {
    const asset = req.params.asset
    var orderBook = await krakenito.getOrderBook(asset,undefined, 5)
    res.send(orderBook)
})

app.delete('/deleteConnection/:id',async (req: any, res: any) => {
    const id = req.params.id

    const result = await client.query({
        text: `DELETE FROM connecter
        WHERE idConnecter=$1;`,
        values: [id]
    })

    return res.json({ok:true});
});

app.get('/getFakeWalletsOfUser/:id',async (req : any,res : any) => {
    const idUser = req.params.id
    const result = await client.query({
        text: `SELECT * FROM wallet_virtuel WHERE idUser = $1`,
        values: [idUser]
    })
    return res.json(result.rows);
})

app.post('/createFakeWallet',async (req : any, res : any) => {
    const montant = 0
    const idUser = req.body.idUser
    const devise = req.body.devise

    const result = await client.query({
        text: `INSERT INTO public.wallet_virtuel(montant, devise, iduser)
        VALUES ($1, $2, $3);`,
        values: [montant, devise, idUser]
    })
    return res.json({ok:true});
})

app.post('/buy',async (req : any, res : any) => {
    const montant = req.body.montant
    const idWallet = req.body.idWallet
    const devise = req.body.devise
    var sold = req.body.sold

    var Http = new XMLHttpRequest();
    const url='https://api.coingecko.com/api/v3/coins/'+devise;
    Http.open("GET", url);
    Http.send();

    Http.onload = async(e :any) => {

        const a = JSON.parse(Http.responseText)

        const value_usd = a.market_data.current_price.usd*montant;
        if( sold - value_usd >= 0 && montant > 0){
            sold -= value_usd
        //console.log(JSON.parse(Http.responseText).market_data.current_price.usd)
            const result = await client.query({
                text: `UPDATE wallet_virtuel
                SET montant=montant+$1
                WHERE idwallet = $2;`,
                values: [montant, idWallet]
            })
        }

        return res.json({sold: sold});
    }
})

app.post('/sell',async (req : any, res : any) => {
    const montant = req.body.montant
    const idWallet = req.body.idWallet
    const devise = req.body.devise
    const walletSold = req.body.walletSold
    var sold = req.body.sold

    var Http = new XMLHttpRequest();
    const url='https://api.coingecko.com/api/v3/coins/'+devise;
    Http.open("GET", url);
    Http.send();

    Http.onload = async(e:any) => {

        const a = JSON.parse(Http.responseText)
        const value_usd = a.market_data.current_price.usd*montant;
        if( walletSold - montant >= 0 && montant > 0){
            sold += value_usd
        //console.log(JSON.parse(Http.responseText).market_data.current_price.usd)
            const result = await client.query({
                text: `UPDATE wallet_virtuel
                SET montant=montant-$1
                WHERE idwallet = $2;`,
                values: [montant, idWallet]
            })
        }

        return res.json({sold: sold});
    }
})

app.post('/order', async(req: any, res: any) => {
    const orderType = req.body.orderType
    const type = req.body.type
    const volume = req.body.volume
    const pair = req.body.pair

    krakenita.addOrder(orderType,type,volume,pair)
    await client.query({
        text: `INSERT INTO public.transaction(TypeOperation, TypeDevise, Montant, Date)
            VALUES ($1, $2, $3, $4);
    `,
        values: [orderType, pair, volume, new Date()]
    })

    return res.json({ok:true});
})

module.exports = router