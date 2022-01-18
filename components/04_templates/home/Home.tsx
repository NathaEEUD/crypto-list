import { Container, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { ICoinData } from 'features/coins'

interface Props {
  data: ICoinData | undefined
  isLoading?: boolean
}

export const Home: React.FC<Props> = ({ data }) => {
  return (
    <Container as="main" color="white" h="full" pos="fixed" w="full">
      {data && (
        <>
          <h1>{data.name}</h1>
          <h2>{data.rank}</h2>
          <h3>{data.price}</h3>
        </>
      )}
    </Container>
  )
}
