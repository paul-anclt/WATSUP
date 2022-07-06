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
exports.KrakenPublic = exports.KrakenAPI = void 0;
const node_kraken_api_1 = require("node-kraken-api");
// Public
class KrakenPublic {
    constructor() {
        this.publicKraken = new node_kraken_api_1.Kraken();
    }
    getAssetsInfo(asset, asset2 = "USD") {
        return __awaiter(this, void 0, void 0, function* () {
            const ticker = yield this.publicKraken.ticker({ pair: asset + asset2 });
            return ticker;
        });
    }
    ;
    getOrderBook(asset, asset2 = "USD", count) {
        return __awaiter(this, void 0, void 0, function* () {
            var orders;
            if (count) {
                orders = yield this.publicKraken.depth({ pair: asset + asset2, count: count });
            }
            else {
                orders = yield this.publicKraken.depth({ pair: asset + asset2 });
            }
            return orders;
        });
    }
    ;
    getRecentTrades(asset, asset2 = "USD", since) {
        return __awaiter(this, void 0, void 0, function* () {
            var trades;
            if (since) {
                trades = yield this.publicKraken.trades({ pair: asset + asset2, since: since });
            }
            else {
                trades = yield this.publicKraken.trades({ pair: asset + asset2 });
            }
            return trades;
        });
    }
    ;
}
exports.KrakenPublic = KrakenPublic;
// Private
class KrakenAPI {
    constructor(key, secret) {
        this.key = key;
        this.secret = secret;
        this.privateKraken = new node_kraken_api_1.Kraken({
            /** REST API key. */
            key: this.key,
            /** REST API secret. */
            secret: this.secret,
        });
    }
    // ---------- User Data ----------
    /**
     * Retrieve all cash balances, net of pending withdrawals.
     * @returns Account Balance
     */
    balance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.privateKraken.balance();
            return balance;
        });
    }
    /**
     * Retrieve a summary of collateral balances, margin position valuations, equity and margin level.
     * @returns Account Balance
     */
    tradeBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.privateKraken.tradeBalance();
            return balance;
        });
    }
    /**
     * Retrieve information about currently open orders.
     * @returns Open Orders
     */
    openOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.privateKraken.openOrders();
            return orders;
        });
    }
    /**
     * Retrieve information about orders that have been closed (filled or cancelled). 50 results are returned at a time, the most recent by default.
     * @returns Closed Orders
     */
    closedOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.privateKraken.closedOrders();
            return orders;
        });
    }
    /**
     * Retrieve information about specific orders.
     * @param txid Comma delimited list of transaction IDs to query info about (50 maximum)
     * @returns object
     */
    queryOrders(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.privateKraken.queryOrders({ txid: txid });
            return orders;
        });
    }
    /**
     * Retrieve information about trades/fills. 50 results are returned at a time, the most recent by default.
     * @returns Trade History
     */
    tradesHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield this.privateKraken.tradesHistory();
            return history;
        });
    }
    /**
     * Retrieve information about specific trades/fills.
     * @returns Trade Info
     */
    queryTrades() {
        return __awaiter(this, void 0, void 0, function* () {
            const trades = yield this.privateKraken.queryTrades();
            return trades;
        });
    }
    /**
     * Get information about open margin positions.
     * @returns object
     */
    openPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            const positions = yield this.privateKraken.openPositions();
            return positions;
        });
    }
    // ---------- User Trading ----------
    /**
     * Place a new order.
     * @param orderType Enum: "market" "limit" "stop-loss" "take-profit" "stop-loss-limit" "take-profit-limit" "settle-position" Order type
     * @param type Enum: "buy" "sell" Order direction (buy/sell)
     * @param pair Asset pair id or altname
     * @param price Price
     * Limit price for limit orders
     * Trigger price for stop-loss, stop-loss-limit, take-profit and take-profit-limit orders
     * @param price2 Secondary Price
     * Limit price for stop-loss-limit and take-profit-limit orders
     * @returns object (OrderAdded)
     */
    addOrder(orderType, type, volume, pair, price, price2) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.privateKraken.addOrder({ ordertype: orderType, type: type, pair: pair, price: price, price2: price2 });
            return order;
        });
    }
    /**
     * Cancel a particular open order (or set of open orders) by txid or userref
     * @param txid Open order transaction ID (txid) or user reference (userref)
     * @returns object (OrderCancelled)
     */
    cancelOrder(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.privateKraken.cancelOrder({ txid: txid });
            return order;
        });
    }
    /**
     * Cancel all open orders
     * @returns object
     */
    cancelAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.privateKraken.cancelAll();
            return orders;
        });
    }
    /**
     *
     * @param timeout Duration (in seconds) to set/extend the timer by
     * @returns object
     */
    cancelAllOrdersAfter(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.privateKraken.cancelAllOrdersAfter({ timeout: timeout });
            return orders;
        });
    }
    // ---------- User Funding ----------
    /**
     * Retrieve methods available for depositing a particular asset.
     * @param asset Asset being deposited
     * @returns Array of objects (depositMethod)
     */
    getDepositMethods(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const methods = yield this.privateKraken.depositMethods({ asset: asset });
            return methods;
        });
    }
    /**
     * Retrieve (or generate a new) deposit addresses for a particular asset and method.
     * @param asset Asset being deposited
     * @param method Name of the deposit method
     * @returns Array of objects (depositAddress)
     */
    getDepositAddresses(asset, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.privateKraken.depositAddresses({ asset: asset, method: method });
            return addresses;
        });
    }
    /**
     * Retrieve information about recent deposits made.
     * @param asset Asset being deposited
     * @param method Name of the deposit method
     * @returns Array of objects (Deposit)
     */
    getDepositStatus(asset, method) {
        return __awaiter(this, void 0, void 0, function* () {
            var status;
            if (method) {
                status = yield this.privateKraken.depositStatus({ asset: asset, method: method });
            }
            else {
                status = yield this.privateKraken.depositStatus({ asset: asset });
            }
            return status;
        });
    }
    /**
     * Retrieve fee information about potential withdrawals for a particular asset, key and amount.
     * @param asset Asset being withdrawn
     * @param key Withdrawal key name, as set up on your account
     * @param amount Amount to be withdrawn
     * @returns Withdrawal Info
     */
    getWithdrawalInfo(asset, key, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const infos = yield this.privateKraken.withdrawInfo({ asset: asset, key: key, amount: amount });
            return infos;
        });
    }
    /**
     * Make a withdrawal request.
     * @param asset Asset being withdrawn
     * @param key Withdrawal key name, as set up on your account
     * @param amount Amount to be withdrawn
     * @returns object
     */
    withdrawFunds(asset, key, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.privateKraken.withdraw({ asset: asset, key: key, amount: amount });
            return request;
        });
    }
    /**
     * Retrieve information about recently requests withdrawals.
     * @param asset Asset being withdrawn
     * @param method Name of the withdrawal method
     * @returns Array of objects (Withdrawal)
     */
    withdrawStatus(asset, method) {
        return __awaiter(this, void 0, void 0, function* () {
            var status;
            if (method) {
                status = yield this.privateKraken.withdrawStatus({ asset: asset, method: method });
            }
            else {
                status = yield this.privateKraken.withdrawStatus({ asset: asset });
            }
            return status;
        });
    }
    /**
     * Cancel a recently requested withdrawal, if it has not already been successfully processed.
     * @param asset Asset being withdrawn
     * @param refid Withdrawal reference ID
     * @returns Whether cancellation was successful or not.
     */
    withdrawCancel(asset, refid) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.privateKraken.withdrawCancel({ asset: asset, refid: refid });
            return request;
        });
    }
    /**
     * Transfer from Kraken spot wallet to Kraken Futures holding wallet. Note that a transfer in the other direction must be requested via the Kraken Futures API endpoint.
     * @param asset Asset to transfer (asset ID or altname)
     * @param from Value: "Spot Wallet" Source wallet
     * @param to Value: "Futures Wallet" Destination wallet
     * @param amount Amount to transfer
     * @returns object
     */
    walletTransfer(asset, from, to, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.privateKraken.walletTransfer({ asset: asset, from: from, to: to, amount: amount });
            return request;
        });
    }
}
exports.KrakenAPI = KrakenAPI;
