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
  const { data: coins, isLoading, isSuccess } = useGetCoinMarkets()
  const { state, dispatch } = useApp()

  React.useEffect(() => {
    if (isSuccess && coins) {
      dispatch({
        type: 'UPDATE_COIN_ID',
        payload: coins[0].id,
      })
    }
  }, [])

  return (
    <>
      {coins && (
        <Home
          data={CoinUtility.getByID(state.coinId, coins)}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default Index
