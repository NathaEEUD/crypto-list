import { VStack } from '@chakra-ui/react'
import React from 'react'

import { useGetCoins } from 'features/coins'
import { SidebarItem } from '@molecules'
import { useApp } from '@services'

export const Sidebar: React.FC = () => {
  const { data } = useGetCoins()
  const { state, dispatch } = useApp()

  /**
   * Handle sidebar item on click to update the app context with the selected coin id
   */
  const handleOnClick = (id: string) => {
    dispatch({
      type: 'UPDATE_COIN_ID',
      payload: id,
    })
  }

  return (
    <VStack
      as="aside"
      h="full"
      maxW={{ base: 'full', md: '30%' }}
      spacing="4"
      w="full"
    >
      {data &&
        data?.length > 0 &&
        data.map(coin => (
          <SidebarItem
            key={coin.id}
            selected={coin.id === state.coinId}
            onClick={handleOnClick}
            {...coin}
          />
        ))}
    </VStack>
  )
}
