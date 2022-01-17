import { ICoinUtility } from './types'

export const CoinUtility: ICoinUtility = {
  formatPercent: value =>
    (value / 100).toLocaleString('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
    }),
  formatUSD: value =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  getByID: (id, cryptos) => cryptos.find(crypto => crypto.id === id) || null,
  map: data => ({
    change: data.price_change_percentage_24h,
    id: data.id,
    image: data.image,
    marketCap: CoinUtility.formatUSD(data.market_cap),
    name: data.name,
    price: CoinUtility.formatUSD(data.current_price),
    rank: data.market_cap_rank,
    supply: data.circulating_supply.toLocaleString(),
    symbol: data.symbol,
    volume: CoinUtility.formatUSD(data.total_volume),
  }),
  mapAll: data => data.map(item => CoinUtility.map(item)),
}
