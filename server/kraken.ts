import { Kraken } from "node-kraken-api";

// Public

class KrakenPublic {
    publicKraken: Kraken;

    constructor() {
        this.publicKraken = new Kraken();
    }

    async getAssetsInfo(asset: string, asset2: string = "USD") {
        const ticker = await this.publicKraken.ticker({ pair: asset+asset2 })
        return ticker
    };
}

// Private

class KrakenAPI {
    key: string;
    secret: string;
    privateKraken: Kraken;

    constructor(key: string, secret: string) {
        this.key = key;
        this.secret = secret;
        this.privateKraken = new Kraken({
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
    async balance() {
        const balance = await this.privateKraken.balance();
        return balance;
    }


    /**
     * Retrieve a summary of collateral balances, margin position valuations, equity and margin level.
     * @returns Account Balance
     */
    async tradeBalance() {
        const balance = await this.privateKraken.tradeBalance();
        return balance;
    }


    /**
     * Retrieve information about currently open orders.
     * @returns Open Orders
     */
    async openOrders() {
        const orders = await this.privateKraken.openOrders();
        return orders;
    }


    /**
     * Retrieve information about orders that have been closed (filled or cancelled). 50 results are returned at a time, the most recent by default.
     * @returns Closed Orders
     */
    async closedOrders() {
        const orders = await this.privateKraken.closedOrders();
        return orders;
    }


    /**
     * Retrieve information about specific orders.
     * @param txid Comma delimited list of transaction IDs to query info about (50 maximum)
     * @returns object
     */
    async queryOrders(txid: string) {
        const orders = await this.privateKraken.queryOrders({txid: txid});
        return orders;
    }


    /**
     * Retrieve information about trades/fills. 50 results are returned at a time, the most recent by default.
     * @returns Trade History
     */
    async tradesHistory() {
        const history = await this.privateKraken.tradesHistory();
        return history;
    }


    /**
     * Retrieve information about specific trades/fills.
     * @returns Trade Info
     */
    async queryTrades() {
        const trades = await this.privateKraken.queryTrades();
        return trades;
    }

    
    /**
     * Get information about open margin positions.
     * @returns object
     */
    async openPositions() {
        const positions = await this.privateKraken.openPositions();
        return positions;
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
    async addOrder(orderType: string, type: string, volume: string, pair: string, price: string, price2: string) {
        const order = await this.privateKraken.addOrder({ordertype: orderType, type: type, pair: pair, price: price, price2: price2});
        return order;
    }


    /**
     * Cancel a particular open order (or set of open orders) by txid or userref
     * @param txid Open order transaction ID (txid) or user reference (userref)
     * @returns object (OrderCancelled)
     */
    async cancelOrder(txid: string) {
        const order = await this.privateKraken.cancelOrder({txid: txid});
        return order;
    }


    /**
     * Cancel all open orders
     * @returns object
     */
    async cancelAllOrders() {
        const orders = await this.privateKraken.cancelAll();
        return orders;
    }


    /**
     * 
     * @param timeout Duration (in seconds) to set/extend the timer by
     * @returns object
     */
    async cancelAllOrdersAfter(timeout: number) {
        const orders = await this.privateKraken.cancelAllOrdersAfter({timeout: timeout});
        return orders;
    }

    // ---------- User Funding ----------


    /**
     * Retrieve methods available for depositing a particular asset.
     * @param asset Asset being deposited
     * @returns Array of objects (depositMethod)
     */
    async getDepositMethods(asset: string) {
        const methods = await this.privateKraken.depositMethods({asset: asset});
        return methods;
    }


    /**
     * Retrieve (or generate a new) deposit addresses for a particular asset and method.
     * @param asset Asset being deposited
     * @param method Name of the deposit method
     * @returns Array of objects (depositAddress)
     */
    async getDepositAddresses(asset: string, method: string) {
        const addresses = await this.privateKraken.depositAddresses({asset: asset, method: method});
        return addresses;
    }


    /**
     * Retrieve information about recent deposits made.
     * @param asset Asset being deposited
     * @param method Name of the deposit method
     * @returns Array of objects (Deposit)
     */
    async getDepositStatus(asset: string, method?: string) {
        var status;
        if (method) {
            status = await this.privateKraken.depositStatus({asset: asset, method: method});
        }
        else {
            status = await this.privateKraken.depositStatus({asset: asset});
        }
        return status;
    }


    /**
     * Retrieve fee information about potential withdrawals for a particular asset, key and amount.
     * @param asset Asset being withdrawn
     * @param key Withdrawal key name, as set up on your account
     * @param amount Amount to be withdrawn
     * @returns Withdrawal Info
     */
    async getWithdrawalInfo(asset: string, key: string, amount: string) {
        const infos = await this.privateKraken.withdrawInfo({asset: asset, key: key, amount: amount});
        return infos;
    }


    /**
     * Make a withdrawal request.
     * @param asset Asset being withdrawn
     * @param key Withdrawal key name, as set up on your account
     * @param amount Amount to be withdrawn
     * @returns object
     */
    async withdrawFunds(asset: string, key: string, amount: string) {
        const request = await this.privateKraken.withdraw({asset: asset, key: key, amount: amount});
        return request;
    }


    /**
     * Retrieve information about recently requests withdrawals.
     * @param asset Asset being withdrawn
     * @param method Name of the withdrawal method
     * @returns Array of objects (Withdrawal)
     */
    async withdrawStatus(asset: string, method?: string) {
        var status;
        if (method) {
            status = await this.privateKraken.withdrawStatus({asset: asset, method: method});
        }
        else {
            status = await this.privateKraken.withdrawStatus({asset: asset});
        }
        return status;
    }


    /**
     * Cancel a recently requested withdrawal, if it has not already been successfully processed.
     * @param asset Asset being withdrawn
     * @param refid Withdrawal reference ID
     * @returns Whether cancellation was successful or not.
     */
    async withdrawCancel(asset: string, refid: string) {
        const request = await this.privateKraken.withdrawCancel({asset: asset, refid: refid});
        return request;
    }


    /**
     * Transfer from Kraken spot wallet to Kraken Futures holding wallet. Note that a transfer in the other direction must be requested via the Kraken Futures API endpoint.
     * @param asset Asset to transfer (asset ID or altname)
     * @param from Value: "Spot Wallet" Source wallet
     * @param to Value: "Futures Wallet" Destination wallet
     * @param amount Amount to transfer
     * @returns object
     */
    async walletTransfer(asset: string, from: string, to: string, amount: string) {
        const request = await this.privateKraken.walletTransfer({asset: asset, from: from, to: to, amount: amount});
        return request;
    }
}

export { KrakenAPI, KrakenPublic };