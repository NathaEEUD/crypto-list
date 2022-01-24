export type ICoinsResponse = Array<ICoinData>

interface ICoinloreResponse {
  data: Array<ICoinloreData>
  info: ICoinloreInfo
}

export interface ICoinloreData {
  id: string
  symbol: string
  name: string
  nameid: string
  rank: number
  price_usd: string
  percent_change_24h: string
  percent_change_1h: string
  percent_change_7d: string
  price_btc: string
  market_cap_usd: string
  volume24: number
  volume24a: number
  csupply: string
  tsupply: string
  msupply: string
}

interface ICoinloreInfo {
  coins_num: number
  time: number
}

export type ICoingeckoResponse = Array<ICoingeckoData>

interface ICoingeckoMarketData {
  price_change_percentage_24h: number
  circulating_supply: number
  current_price: { usd: number }
  market_cap: { usd: number }
  total_volume: { usd: number }
}

export interface ICoingeckoData {
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  circulating_supply: number
  current_price: number
  fully_diluted_valuation: number
  high_24h: number
  id: string
  image: string & { small: string }
  last_updated: string
  low_24h: number
  market_data?: ICoingeckoMarketData
  market_cap: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  market_cap_rank: number
  max_supply: number
  name: string
  price_change_24h: number
  price_change_percentage_24h: number
  roi: null
  symbol: string
  total_supply: number
  total_volume: number
}

export interface ICoinData {
  change: number
  id: string
  image: string
  marketCap: string
  name: string
  price: string
  rank: number
  supply: string
  symbol: string
  volume: string
}

export interface ICoinUtility {
  formatPercent: (value: number) => string
  formatUSD: (value: number) => string
  getByID: (id: string, coins: ICoinsResponse) => ICoinData
  map: (data: ICoingeckoData) => ICoinData
  mapAll: (data: Array<ICoingeckoData>) => ICoinsResponse
}
