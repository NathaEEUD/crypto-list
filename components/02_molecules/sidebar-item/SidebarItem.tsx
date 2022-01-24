import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

import { ICoinData } from '@features/coins'
import { useApp } from '@services'

const MotionBox = motion<BoxProps>(Box)

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    x: -100,
    opacity: 0,
  },
}

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
  // App context
  const { state } = useApp()

  return (
    <MotionBox
      animate={!state.sidebarCollapsed ? 'open' : 'closed'}
      as="button"
      bgColor="gray.900"
      borderBottomRightRadius="full"
      borderTopRightRadius="full"
      color="white"
      p="4"
      pl="0"
      position="relative"
      role="group"
      variants={variants}
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
        <Heading
          isTruncated
          fontSize={{ base: '3em', sm: '4em', md: '3em', lg: '4em', xl: '5em' }}
          size="4xl"
          textTransform="uppercase"
        >
          {symbol}
        </Heading>

        <Avatar name={name} size="xl" src={image} />
      </Flex>

      <HStack
        _groupHover={{ width: '96%' }}
        bgColor={!selected ? 'whiteAlpha.100' : 'whiteAlpha.300'}
        borderRadius="inherit"
        px={{ base: '6', lg: '10' }}
        py={{ base: '6', lg: '8' }}
        spacing="4"
        transition="all 0.4s ease-in-out"
        w={!selected ? '88%' : '96%'}
        zIndex="docked"
      >
        <Heading size="md">{rank}</Heading>

        <Avatar name={name} size="md" src={image} />

        <VStack align="flex-start" spacing="0.5" zIndex="inherit">
          <Heading
            fontSize={{ base: 'sm', lg: 'md' }}
            size="md"
            textAlign="left"
          >
            {name}
          </Heading>
          <Text fontSize={{ base: 'xs', lg: 'sm' }}>{price}</Text>
        </VStack>
      </HStack>
    </MotionBox>
  )
}
