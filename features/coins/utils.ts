import { ICoinUtility } from './types'

import { ICoinData } from '.'

export const CoinUtility: ICoinUtility = {
  formatPercent: value =>
    (value / 100).toLocaleString('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
    }),
  formatUSD: value =>
    value?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 5 : 2,
    }),
  getByID: (id, coins) => coins.find(coin => coin.id === id) as ICoinData,
  map: data => ({
    id: data?.id,
    image: data?.image?.small || data?.image,
    name: data?.name,
    symbol: data?.symbol,
    rank: data?.market_cap_rank,
    change:
      data?.market_data?.price_change_percentage_24h ||
      data?.price_change_percentage_24h,
    supply:
      data?.market_data?.circulating_supply?.toLocaleString() ||
      data?.circulating_supply.toLocaleString(),
    price: CoinUtility.formatUSD(
      data?.market_data?.current_price?.usd || data?.current_price,
    ),
    marketCap: CoinUtility.formatUSD(
      data?.market_data?.market_cap?.usd || data?.market_cap,
    ),
    volume: CoinUtility.formatUSD(
      data?.market_data?.total_volume?.usd || data?.total_volume,
    ),
  }),
  mapAll: data => data.map(item => CoinUtility.map(item)),
}
