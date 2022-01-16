import { dehydrate, QueryClient, useQuery } from 'react-query'

import { API_ENDPOINTS, API_INSTANCE } from 'services'

import { ICoinsResponse } from '.'

export const coinsKeys = {
  all: ['coins'] as const,
  lists: () => [...coinsKeys.all, 'list'] as const,
  detail: (id: string) => [...coinsKeys.all, id] as const,
}

export const fetchCoins = async (url: string): Promise<ICoinsResponse> => {
  const response = await API_INSTANCE({
    url,
    method: 'GET',
  })

  return response.data
}

export const useGetCoins = () => {
  const url = API_ENDPOINTS.coins

  return useQuery(coinsKeys.lists(), () => fetchCoins(url), {
    staleTime: 3600000,
  })
}

export const prefetchCoins = async () => {
  const queryClient = new QueryClient()
  const url = API_ENDPOINTS.coins

  await queryClient.prefetchQuery(coinsKeys.lists(), () => fetchCoins(url))

  return dehydrate(queryClient)
}
