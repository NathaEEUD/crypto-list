import { VStack } from '@chakra-ui/react'
import React from 'react'

import { useGetCoins } from 'features/coins'

export const Sidebar: React.FC = () => {
  const { data } = useGetCoins()

  return (
    <VStack as="aside" h="full" maxW={{ base: 'full', md: '30%' }} spacing="4">
      {data.data &&
        data.data?.length > 0 &&
        data.data.map((coin: any) => <div key={coin.id}>{coin.name}</div>)}
    </VStack>
  )
}
