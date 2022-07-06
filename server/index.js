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
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors(corsOptions));
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const binance_1 = require("./binance");
const kraken_1 = require("./kraken");
var binancito = new binance_1.BinanceAPI();
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
app.get('/userPlateformes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const result = yield client.query({
        text: 'SELECT nomplateforme FROM plateforme WHERE idplateforme in (select idplateforme from connecter where iduser=$1)',
        values: [idUser]
    });
    res.json(result.rows);
}));
app.get('/getBalanceInfo/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var balance = yield krakenito.getAssetsInfo(asset);
    res.send(informations);
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
module.exports = router;
