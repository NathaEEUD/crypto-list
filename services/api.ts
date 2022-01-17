import axios from 'axios'

type IApi = 'coinlore' | 'coingecko'

export const API: IApi = 'coingecko'

const API_URL_LIST = {
  coinlore: 'https://api.coinlore.net/api',
  coingecko: 'https://api.coingecko.com/api/v3',
}

const API_ENDPOINTS_LIST = {
  coinlore: {
    coins: `/tickers`,
    coin: `/ticker`,
  },
  coingecko: {
    coins: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`,
    coin: `/ticker`,
  },
}

export const API_ENDPOINTS = {
  coins: API_ENDPOINTS_LIST[API].coins,
  coin: API_ENDPOINTS_LIST[API].coin,
}

export const API_INSTANCE = axios.create({
  baseURL: API_URL_LIST[API],
})
