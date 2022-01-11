import axios from 'axios'

const API_URL = 'https://api.coinlore.net/api'

export const API_ENDPOINTS = {
  coins: `/tickers`,
  coin: `/ticker`,
}

export const API_INSTANCE = axios.create({
  baseURL: API_URL,
})
