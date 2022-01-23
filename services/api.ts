import axios from 'axios'

type IApi = 'coinlore' | 'coingecko'

export const API: IApi = 'coingecko'

const API_URL_LIST = {
  coinlore: 'https://api.coinlore.net/api',
  coingecko: 'https://api.coingecko.com/api/v3',
}

const API_PER_PAGE = 100
const API_PAGE = 1

const API_ENDPOINTS_LIST = {
  coinlore: {
    list: '',
    coins: `/tickers`,
    coin: `/ticker`,
  },
  coingecko: {
    list: `/coins/list`,
    coins: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${API_PER_PAGE}&page=${API_PAGE}&sparkline=false`,
    coin: `/ticker`,
  },
}

export const API_ENDPOINTS = {
  list: API_ENDPOINTS_LIST[API].list,
  coins: API_ENDPOINTS_LIST[API].coins,
  coin: API_ENDPOINTS_LIST[API].coin,
}

export const API_INSTANCE = axios.create({
  baseURL: API_URL_LIST[API],
})
