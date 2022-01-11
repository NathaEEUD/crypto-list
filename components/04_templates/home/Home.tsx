import { Container, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { ICoinsResponse } from 'features/coins'

interface Props {
  data: ICoinsResponse
  isLoading?: boolean
}

export const Home: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <Container as="main">
      <Skeleton h="full" isLoaded={!isLoading} w="full">
        {data?.data.length > 0 &&
          data.data.map(coin => <h2 key={coin.id}>{coin.name}</h2>)}
      </Skeleton>
    </Container>
  )
}
