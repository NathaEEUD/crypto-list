import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

import { ICoinData } from '@features/coins'

type Props = Partial<ICoinData> & {
  selected: boolean
  onClick: (id: string) => void
}

export const SidebarItem: React.FC<Props> = ({
  selected,
  symbol,
  name,
  rank,
  price,
  id,
  image,
  onClick,
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
      role="group"
      w="full"
      onClick={() => onClick(id as string)}
    >
      <Flex
        align="center"
        borderBottomRightRadius="full"
        borderTopRightRadius="full"
        h="full"
        justifyContent="space-between"
        left="0"
        opacity="0.1"
        position="absolute"
        pr="4"
        top="0"
        w="full"
        zIndex="base"
      >
        <Heading fontSize="7em" size="4xl" textTransform="uppercase">
          {symbol}
        </Heading>

        <Avatar name={name} size="xl" src={image} />
      </Flex>

      <HStack
        _groupHover={{ width: '96%' }}
        bgColor={!selected ? 'whiteAlpha.100' : 'whiteAlpha.300'}
        borderRadius="inherit"
        px="10"
        py="8"
        spacing="4"
        transition="all 0.4s ease-in-out"
        w={!selected ? '88%' : '96%'}
        zIndex="docked"
      >
        <Heading size="md">{rank}</Heading>

        <Avatar name={name} size="md" src={image} />

        <VStack align="flex-start" spacing="0.5" zIndex="inherit">
          <Heading size="md">{name}</Heading>
          <Text>{price}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
