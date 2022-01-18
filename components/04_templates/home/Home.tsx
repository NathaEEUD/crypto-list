import {
  Box,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'

import { ICoinData } from 'features/coins'

interface Props {
  data: ICoinData | undefined
  isLoading?: boolean
}

export const Home: React.FC<Props> = ({ data }) => {
  return (
    <Box as="main" color="white" h="full" p="4" pos="fixed" w="70%">
      {data && (
        <>
          <StatGroup flexDirection="column" gap="4">
            <Stat>
              <StatLabel>Rank</StatLabel>
              <StatNumber>{data.rank}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Name</StatLabel>
              <StatNumber>{data.name}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Price</StatLabel>
              <StatNumber>{data.price}</StatNumber>
              <StatHelpText>
                <StatArrow type={data.change >= 0 ? 'increase' : 'decrease'} />
                {data.change}
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Market Cap</StatLabel>
              <StatNumber>{data.marketCap}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>24H Volume</StatLabel>
              <StatNumber>{data.volume}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Circulating Supply</StatLabel>
              <StatNumber>{data.supply}</StatNumber>
            </Stat>
          </StatGroup>

          <Heading
            as="h1"
            bottom="0"
            filter="blur(6px)"
            fontSize="20em"
            opacity="0.15"
            pos="absolute"
            right="0"
            size="4xl"
            textTransform="uppercase"
          >
            {data.symbol}
          </Heading>
        </>
      )}
    </Box>
  )
}
