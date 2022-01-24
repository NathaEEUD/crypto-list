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
    <Box
      as="main"
      color="whiteAlpha.800"
      h="calc(100% - 60px)"
      p="4"
      pos="fixed"
      w="inherit"
    >
      {data && (
        <>
          <StatGroup flexDirection="column" gap="4">
            {data.rank && (
              <Stat>
                <StatLabel>Rank</StatLabel>
                <StatNumber>{data.rank}</StatNumber>
              </Stat>
            )}

            {data.name && (
              <Stat>
                <StatLabel>Name</StatLabel>
                <StatNumber>{data.name}</StatNumber>
              </Stat>
            )}

            {data.price && (
              <Stat>
                <StatLabel>Price</StatLabel>
                <StatNumber>{data.price}</StatNumber>
                {data.change && (
                  <StatHelpText>
                    <StatArrow
                      type={data.change >= 0 ? 'increase' : 'decrease'}
                    />
                    {data.change}%
                  </StatHelpText>
                )}
              </Stat>
            )}

            {data.marketCap && (
              <Stat>
                <StatLabel>Market Cap</StatLabel>
                <StatNumber>{data.marketCap}</StatNumber>
              </Stat>
            )}

            {data.volume && (
              <Stat>
                <StatLabel>24H Volume</StatLabel>
                <StatNumber>{data.volume}</StatNumber>
              </Stat>
            )}

            {data.supply && (
              <Stat>
                <StatLabel>Circulating Supply</StatLabel>
                <StatNumber>{data.supply}</StatNumber>
              </Stat>
            )}
          </StatGroup>

          <Heading
            as="h1"
            bottom="0"
            filter="blur(6px)"
            fontSize={{ base: '8em', md: '12em', lg: '16em' }}
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
