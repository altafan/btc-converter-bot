const config = require('./config.json')
const rawRequest = require('./helpers')
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(config.token, { polling: true })

let callbackType,
    currency = 'eur',
    exchange = 'coinmarketcap'

bot.onText(/\/start|help/, message => {
  bot.sendMessage(message.chat.id, `
    /help - Get the list of all commands\n/btc - Get the current btc price\n/currency - Select the currency in which btc are converted\n/exchanger - Select the exchanger from the list\n/which_exchanger - View the current exchanger
  `)
})

bot.onText(/\/which_exchanger/, message => {
  bot.sendMessage(message.chat.id, exchange)
})

bot.onText(/\/btc/, message => {
  rawRequest(exchange, currency)
    .then(result => bot.sendMessage(message.chat.id, result))
    .catch(error => bot.sendMessage(message.chat.id, error))
})

bot.onText(/\/exchanger/, message => {
  callbackType = 'exchanger'

  bot.sendMessage(message.chat.id, "Select exchanger", {
    'reply_markup': {
      'inline_keyboard': [
        [{
          'text': 'kraken',
          'callback_data': 'kraken'
        }],
        [{
          'text': 'coinmarketcap',
          'callback_data': 'coinmarketcap'
        }],
        [{
          'text': 'coinbase',
          'callback_data': 'coinbase'
        }],
        [{
          'text': 'bitcoinaverage',
          'callback_data': 'bitcoinaverage'
        }]
      ]
    }
  })
})

bot.onText(/\/currency/, message => {
  callbackType = 'currency'

  bot.sendMessage(message.chat.id, "Select currency", {
    'reply_markup': {
      'inline_keyboard': [
        [{
          'text': 'Euro (EUR)',
          'callback_data': 'eur'
        }],
        [{
          'text': 'US Dollar (USD)',
          'callback_data': 'usd'
        }],
        [{
          'text': 'Pound (GBP)',
          'callback_data': 'gbp'
        }],
      ]
    }
  })
})

bot.on('callback_query', query => {
  if (callbackType === 'exchanger') {
    bot.answerCallbackQuery(query.id, { text: 'Exchanger updated!' })
    exchange = query.data
  }

  if (callbackType === 'currency') {
    bot.answerCallbackQuery(query.id, { text: 'Currency updated!' })
    currency = query.data
  }
})