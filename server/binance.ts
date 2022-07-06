import { Spot } from "@binance/connector";
class BinanceAPI {
    key: string;
    secret: string;
    binanceClient: any;

    constructor() {
        this.key = '3tVDks7TYCzNNuhn1s6r1jWpaU4VGZYdeGYasFTsydRwkWhczfg0coPoVZiyp89q';
        this.secret = 'tvBQ98lY8VxgsgnHTyHp5OEWjgrr3IrJvWCnHyOWN1ZRaYh8DOva21GqdgK29bLh';
        this.binanceClient = new Spot( this.key, this.secret, { baseURL: 'https://testnet.binance.vision' } );// base url for test accounts/keys
    }

    private async balance() { // LIST CRYPTO HOLDINGS + SOME ACC INFOS
        let balance;
        await this.binanceClient.account().then(
            (response: any) => {
                this.binanceClient.logger.log(response.data);
                balance = response.data;
            }
        ).catch((error: any) => this.binanceClient.logger.error(error));

        return balance;
    }

    private async order(symbol: string, type: string, price: string, quantity: string) { // CREATE A NEW ORDER
        let order;

        await this.binanceClient.newOrder(symbol, type, 'LIMIT', { // BUY BNB WITH USDT
            price: price,
            quantity: quantity,
            timeInForce: 'GTC'
        }).then((response: any) => {
            this.binanceClient.logger.log(response.data);
            order = response.data;
        }).catch((error: any) => this.binanceClient.logger.error(error));

        return order;
    }

    private async openOrders(symbol: string) { // LIST OPEN ORDERS ON A PAIR
        let openOrders;

        await this.binanceClient.openOrders({ symbol }).then((response: any) => {
            this.binanceClient.logger.log(response.data)
            openOrders = response.data;
        })
        .catch((error: any) => this.binanceClient.logger.error(error));
    
        return openOrders;
    }

    private async trades(symbol: string) { // LIST TRADES ON A PAIR
        let trades;

        await this.binanceClient.myTrades(symbol).then((response: any) => {
            this.binanceClient.logger.log(response.data);
            trades = response.data;
        })
        .catch((error: any) => this.binanceClient.logger.error(error));
    
        return trades;
    }

}

export default { BinanceAPI };