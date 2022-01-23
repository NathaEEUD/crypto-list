import { dehydrate, QueryClient, useQuery } from 'react-query'

import { API_ENDPOINTS, API_INSTANCE } from 'services'

import { CoinUtility, ICoingeckoResponse } from '.'

export const coinsKeys = {
  all: ['coins'] as const,
  list: () => [...coinsKeys.all, 'list'] as const,
  markets: () => [...coinsKeys.all, 'markets'] as const,
  detail: (id: string) => [...coinsKeys.all, id] as const,
}

export const fetchCoins = async (url: string): Promise<ICoingeckoResponse> => {
  const response = await API_INSTANCE({
    url,
    method: 'GET',
  })

  return response.data
}

// Get the coin markets list and coin lists on server side
export const prefetchInitialData = async () => {
  const queryClient = new QueryClient()
  const URL_COINS = API_ENDPOINTS.coins
  const URL_LIST = API_ENDPOINTS.list

  await queryClient.prefetchQuery(coinsKeys.markets(), () =>
    fetchCoins(URL_COINS),
  )

  await queryClient.prefetchQuery(coinsKeys.list(), () => fetchCoins(URL_LIST))

  return dehydrate(queryClient)
}

// Get the coin markets list on client side
export const useGetCoinMarkets = () => {
  const url = API_ENDPOINTS.coins

  return useQuery(coinsKeys.markets(), () => fetchCoins(url), {
    staleTime: 3600000,
    select: (data: ICoingeckoResponse) => CoinUtility.mapAll(data),
  })
}

// Get the coin lists to show on the search filter
export const useGetCoinLists = () => {
  const url = API_ENDPOINTS.list

  return useQuery(coinsKeys.list(), () => fetchCoins(url), {
    staleTime: 3600000,
  })
}
