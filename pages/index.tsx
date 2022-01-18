import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

import React from 'react'

import { Home } from '@templates'
import { CoinUtility, prefetchCoins, useGetCoins } from 'features/coins'
import { useApp } from '@services'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      dehydratedState: await prefetchCoins(),
    },
  }
}

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading, isSuccess } = useGetCoins()
  const { state, dispatch } = useApp()

  React.useEffect(() => {
    if (isSuccess && data) {
      dispatch({
        type: 'UPDATE_COIN_ID',
        payload: data[0].id,
      })
    }
  }, [])

  return (
    <>
      {data && (
        <Home
          data={CoinUtility.getByID(state.coinId, data)}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default Index
