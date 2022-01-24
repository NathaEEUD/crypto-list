import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

import React from 'react'

import { useApp } from '@services'
import { Home } from '@templates'
import {
  CoinUtility,
  prefetchInitialData,
  useGetCoin,
  useGetCoinMarkets,
} from 'features/coins'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      dehydratedState: await prefetchInitialData(),
    },
  }
}

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  // App context
  const { state, dispatch } = useApp()

  // Get the list of the coin markets
  const { data: coinMarkets, isLoading, isSuccess } = useGetCoinMarkets()

  // Always select the first coin after the first render
  React.useEffect(() => {
    if (isSuccess && coinMarkets) {
      dispatch({
        type: 'UPDATE_COIN_ID',
        payload: coinMarkets[0].id,
      })
    }
  }, [])

  // Verify if the selected coin data is in cache
  const coinIdExistsInMarkets =
    isSuccess && coinMarkets && CoinUtility.getByID(state.coinId, coinMarkets)

  // Disable the query if the is encountered in cache, else execute the query
  const { data: coinData } = useGetCoin(
    state.coinId,
    !Boolean(coinIdExistsInMarkets),
  )

  return (
    <>
      {coinMarkets && (
        <Home data={coinIdExistsInMarkets || coinData} isLoading={isLoading} />
      )}
    </>
  )
}

export default Index
