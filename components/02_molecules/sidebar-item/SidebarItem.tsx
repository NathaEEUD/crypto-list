import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface Props {
  id: string
  symbol: string
  name: string
  rank: number
  price: string
}

export const SidebarItem: React.FC<Props> = ({
  id,
  symbol,
  name,
  rank,
  price,
}) => {
  return (
    <Box
      as="button"
      bgColor="gray.900"
      borderBottomRightRadius="full"
      borderTopRightRadius="full"
      color="white"
      p="4"
      pl="0"
      position="relative"
      w="full"
    >
      <Flex
        align="center"
        borderBottomRightRadius="full"
        borderTopRightRadius="full"
        h="full"
        left="0.1%"
        opacity="0.1"
        position="absolute"
        top="0"
        w="full"
        zIndex="base"
      >
        <Heading size="4xl" textTransform="uppercase">
          {symbol}
        </Heading>
      </Flex>

      <HStack
        bgColor="whiteAlpha.100"
        borderRadius="inherit"
        px="10"
        py="8"
        spacing="8"
        w="90%"
        zIndex="docked"
      >
        <Heading size="md">{rank}</Heading>

        <VStack align="flex-start" spacing="0.5" zIndex="inherit">
          <Heading size="lg">{name}</Heading>
          <Text>{price}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
