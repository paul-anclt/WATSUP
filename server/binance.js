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
exports.BinanceAPI = void 0;
const { Spot } = require('@binance/connector');
class BinanceAPI {
    constructor() {
        this.key = '3tVDks7TYCzNNuhn1s6r1jWpaU4VGZYdeGYasFTsydRwkWhczfg0coPoVZiyp89q';
        this.secret = 'tvBQ98lY8VxgsgnHTyHp5OEWjgrr3IrJvWCnHyOWN1ZRaYh8DOva21GqdgK29bLh';
        this.binanceClient = new Spot(this.key, this.secret, { baseURL: 'https://testnet.binance.vision' }); // base url for test accounts/keys
    }
    balance() {
        return __awaiter(this, void 0, void 0, function* () {
            let balance;
            yield this.binanceClient.account().then((response) => {
                this.binanceClient.logger.log(response.data);
                balance = response.data;
            }).catch((error) => this.binanceClient.logger.error(error));
            return balance;
        });
    }
    order(symbol, type, price, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            let order;
            yield this.binanceClient.newOrder(symbol, type, 'LIMIT', {
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            }).then((response) => {
                this.binanceClient.logger.log(response.data);
                order = response.data;
            }).catch((error) => this.binanceClient.logger.error(error));
            return order;
        });
    }
    openOrders(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let openOrders;
            yield this.binanceClient.openOrders({ symbol }).then((response) => {
                this.binanceClient.logger.log(response.data);
                openOrders = response.data;
            })
                .catch((error) => this.binanceClient.logger.error(error));
            return openOrders;
        });
    }
    trades(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let trades;
            yield this.binanceClient.myTrades(symbol).then((response) => {
                this.binanceClient.logger.log(response.data);
                trades = response.data;
            })
                .catch((error) => this.binanceClient.logger.error(error));
            return trades;
        });
    }
}
exports.BinanceAPI = BinanceAPI;
