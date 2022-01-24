import { VStack, Box, BoxProps, PropsOf, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion'

import { CoinUtility, useGetCoin, useGetCoinMarkets } from 'features/coins'
import { SidebarItem } from '@molecules'
import { useApp } from '@services'

const MotionBox = motion<BoxProps>(Box)

const variants = {
  open: {
    width: '100%',
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    width: '0%',
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

type Props = PropsOf<typeof Box>

export const Sidebar: React.FC<Props> = props => {
  // App context
  const { state, dispatch } = useApp()

  // Get the list of the coin markets
  const { data: coinMarkets, isSuccess } = useGetCoinMarkets()

  // Get the media query for screens widder than 768px
  const [mqWidderThan768] = useMediaQuery(['(min-width: 768px)'])

  // Verify if the selected coin data is in cache
  const coinIdExistsInMarkets =
    isSuccess && coinMarkets && CoinUtility.getByID(state.coinId, coinMarkets)

  // Disable the query if the is encountered in cache, else execute the query
  const { data: coinData } = useGetCoin(
    state.coinId,
    !Boolean(coinIdExistsInMarkets),
  )

  const coins = coinIdExistsInMarkets ? coinMarkets : [coinData]

  /**
   * Handle sidebar item on click to update the app context with the selected coin id
   */
  const handleOnClick = (id: string) => {
    dispatch({
      type: 'UPDATE_COIN_ID',
      payload: id,
    })

    if (!mqWidderThan768) {
      dispatch({
        type: 'TOGGLE_SIDEBAR_COLLAPSE',
        payload: '',
      })
    }
  }

  return (
    <MotionBox
      animate={!state.sidebarCollapsed ? 'open' : 'closed'}
      as="aside"
      h="inherit"
      variants={variants}
      w="inherit"
      {...props}
    >
      <VStack as="ul" h="inherit" spacing="4" w="inherit">
        {coins &&
          coins?.length > 0 &&
          coins.map(coin => (
            <SidebarItem
              key={coin?.id}
              selected={coin?.id === state.coinId}
              onClick={handleOnClick}
              {...coin}
            />
          ))}
      </VStack>
    </MotionBox>
  )
}
