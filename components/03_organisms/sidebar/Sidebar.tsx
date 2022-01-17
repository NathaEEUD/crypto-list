import { VStack } from '@chakra-ui/react'
import React from 'react'

import { useGetCoins } from 'features/coins'
import { SidebarItem } from '@molecules'

export const Sidebar: React.FC = () => {
  const { data } = useGetCoins()

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
        data.map(coin => <SidebarItem key={coin.id} {...coin} />)}
    </VStack>
  )
}
