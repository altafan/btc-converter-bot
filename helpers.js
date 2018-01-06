const axios = require('axios')
const { symbol, pair, url } = require('./constants')

const formatResponse = (value, currency) => `1 btc is equal to ${symbol[currency]} ${parseFloat(value).toFixed(2)}`

const rawRequest = (exchange, currency) => {
  switch(exchange) {
    case 'kraken':
      return new Promise((resolve, reject) => {
        axios.post(
          url[exchange],
          {
            pair: pair[currency],
            headers: { 'Api-Key': config.apiKey, 'Api-Sign': config.apiSecret }
          }
        )
          .then(({ data }) => resolve(data.result ? formatResponse(data.result[pair[currency]].c[0], currency) : 'An error occured, retry'))
          .catch(error => {
            console.log(error)
            reject('Timeout error, please retry')
          })
      })

    case 'coinbase':
      return new Promise((resolve, reject) => {
        axios.get(`${url[exchange]}BTC-${currency.toUpperCase()}/spot`, { headers: { 'CB-VERSION': '2015-04-08' } })
          .then(({ data }) => resolve(data && data.data && data.data.amount ? formatResponse(data.data.amount, currency) : 'An error occured, retry'))
          .catch(error => {
            console.log(error)
            reject('Timeout error, please retry')
          })
      })

    case 'bitcoinaverage':
      return new Promise((resolve, reject) => {
        axios.get(`${url[exchange]}BTC${currency.toUpperCase()}`)
          .then(({ data }) => resolve(data.last ? formatResponse(data.last, currency) : 'An error occured, retry'))
          .catch(error => {
            console.log(error)
            reject('Timeout error, please retry')
          })
      })

    default:
      return new Promise((resolve, reject) => {
        axios.get(`${url[exchange]}?convert=${currency.toUpperCase()}`)
          .then(({ data }) => {
            const rawResponse = data.find(elem => elem.symbol.toLowerCase() === 'btc')

            resolve(rawResponse && rawResponse[`price_${currency}`] ? formatResponse(rawResponse[`price_${currency}`], currency) : 'An error occured, retry')
          })
          .catch(error => {
            console.log(error)
            reject('Timeout error, please retry')
          })
      })
  }
}

module.exports = rawRequest