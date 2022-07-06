"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const bp = require('body-parser');
var XMLHttpRequest = require('xhr2');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors(corsOptions));
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const kraken_1 = require("./kraken");
var krakenito = new kraken_1.KrakenPublic();
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'postgres'
});
client.connect();
app.listen(3001, function () {
    console.log("Node Js Server is Running");
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const result = yield client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    });
    if (result.rows.length === 0) {
        res.status(401).json({
            message: 'user doesnt exist'
        });
        return;
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e
    const user = result.rows[0];
    if (yield bcrypt.compare(password, user.password)) {
        // alors connecter l'utilisateur
        //req.session.userId = user.id
        res.json({
            id: user.iduser,
            email: user.email
        });
    }
    else {
        res.status(401).json({
            message: 'bad password'
        });
        return;
    }
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const result = yield client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    });
    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'user already exists'
        });
        return;
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e
    const hash = yield bcrypt.hash(password, 10);
    yield client.query({
        text: `INSERT INTO utilisateur(email, password)
    VALUES ($1, $2)
    `,
        values: [email, hash]
    });
    return res.json({ ok: true });
}));
app.get('/userConnections/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const result = yield client.query({
        text: 'SELECT * FROM connecter WHERE iduser=$1',
        values: [idUser]
    });
    res.json(result.rows);
}));
app.get('/plateformes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client.query({
        text: 'SELECT * FROM plateforme'
    });
    res.json(result.rows);
}));
app.post('/addConnection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPlateforme = req.body.idPlateforme;
    const idUser = req.body.idUser;
    const publicToken = req.body.publicToken;
    const privateToken = req.body.privateToken;
    yield client.query({
        text: `INSERT INTO public.connecter(idplateforme, iduser, publictoken, privatetoken)
            VALUES ($1, $2, $3, $4);
    `,
        values: [idPlateforme, idUser, publicToken, privateToken]
    });
    return res.json({ ok: true });
}));
app.get('/getAssetsInfo/:asset', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = req.params.asset;
    var informations = yield krakenito.getAssetsInfo(asset);
    res.send(informations);
}));
app.delete('/deleteConnection/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield client.query({
        text: `DELETE FROM connecter
        WHERE idConnecter=$1;`,
        values: [id]
    });
    return res.json({ ok: true });
}));
app.get('/getFakeWalletsOfUser/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const result = yield client.query({
        text: `SELECT * FROM wallet_virtuel WHERE idUser = $1`,
        values: [idUser]
    });
    return res.json(result.rows);
}));
app.post('/createFakeWallet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const montant = 0;
    const idUser = req.body.idUser;
    const devise = req.body.devise;
    const result = yield client.query({
        text: `INSERT INTO public.wallet_virtuel(montant, devise, iduser)
        VALUES ($1, $2, $3);`,
        values: [montant, devise, idUser]
    });
    return res.json({ ok: true });
}));
app.post('/buy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const montant = req.body.montant;
    const idWallet = req.body.idWallet;
    const devise = req.body.devise;
    var sold = req.body.sold;
    var Http = new XMLHttpRequest();
    const url = 'https://api.coingecko.com/api/v3/coins/' + devise;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const a = JSON.parse(Http.responseText);
        const value_usd = a.market_data.current_price.usd * montant;
        if (sold - value_usd >= 0 && montant > 0) {
            sold -= value_usd;
            //console.log(JSON.parse(Http.responseText).market_data.current_price.usd)
            const result = yield client.query({
                text: `UPDATE wallet_virtuel
                SET montant=montant+$1
                WHERE idwallet = $2;`,
                values: [montant, idWallet]
            });
        }
        return res.json({ sold: sold });
    });
}));
app.post('/sell', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const montant = req.body.montant;
    const idWallet = req.body.idWallet;
    const devise = req.body.devise;
    const walletSold = req.body.walletSold;
    var sold = req.body.sold;
    var Http = new XMLHttpRequest();
    const url = 'https://api.coingecko.com/api/v3/coins/' + devise;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const a = JSON.parse(Http.responseText);
        const value_usd = a.market_data.current_price.usd * montant;
        if (walletSold - montant >= 0 && montant > 0) {
            sold += value_usd;
            //console.log(JSON.parse(Http.responseText).market_data.current_price.usd)
            const result = yield client.query({
                text: `UPDATE wallet_virtuel
                SET montant=montant-$1
                WHERE idwallet = $2;`,
                values: [montant, idWallet]
            });
        }
        return res.json({ sold: sold });
    });
}));
module.exports = router;
