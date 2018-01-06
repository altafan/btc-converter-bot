# Bitcoin Converter Telegram Bot

Look at the current btc price with this simple telegram bot

Available exchangers:
* [Coinmarketcap](https://coinmarketcap.com)
* [Coinbase](https://www.coinbase.com)
* [Bitcoinaverage](https://bitcoinaverage.com)
* [Kraken](https://www.kraken.com)

Available currencies:
* Euro (EUR)
* Dollar (USD)
* Pound (GBP)

## Prerequisites

* [Node](https://nodejs.org/it/)
* [Npm](https://www.npmjs.com/)

## Installing

First start a new bot on Telegram with the BotFather.\
If you want to use Kraken API sign in and create an API key.\
Put the bot token and kraken api credentials in a `config.json` in the root of the project as follows:

```
{
  "token": "TELEGRAM_BOT_TOKEN",
  "apiKey": "KRAKEN_API_KEY",
  "apiSecret": "KRAKEN_API_PRIVATE_KEY"
}
```

If you don't want to use Kraken API just comment/delete all kraken stuff in `index.js`, `helpers.js` and `constants.js`.

Install dependencies

```
npm i
```

## Running

Start the bot

```
node index.js
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details