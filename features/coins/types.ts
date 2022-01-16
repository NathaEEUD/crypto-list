export interface ICoinsResponse {
  data: Array<ICoinData>
  info: ICoinsInfo
}

export interface ICoinData {
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

interface ICoinsInfo {
  coins_num: number
  time: number
}
