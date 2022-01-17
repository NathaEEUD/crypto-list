import { Container, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { ICoinsResponse } from 'features/coins'

interface Props {
  data: ICoinsResponse | undefined
  isLoading?: boolean
}

export const Home: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <Container as="main" color="white" pos="fixed">
      <Skeleton h="full" isLoaded={!isLoading} w="full">
        {data &&
          data?.length > 0 &&
          data.map(
            coin =>
              coin.id === 'bitcoin' && (
                <>
                  <h1>{coin.name}</h1>
                  <h2>{coin.rank}</h2>
                  <h3>{coin.price}</h3>
                </>
              ),
          )}
      </Skeleton>
    </Container>
  )
}
