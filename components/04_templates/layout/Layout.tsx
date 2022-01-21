import { Box, BoxProps, HStack, useMediaQuery } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { motion } from 'framer-motion'

import { Header, Sidebar } from '@organisms'
import { useApp } from '@services'

const MotionBox = motion<BoxProps>(Box)

const baseVariants = {
  open: {
    width: '0%',
    opacity: 0,
  },
  closed: {
    width: '100%',
    opacity: 1,
    transition: {
      delay: 0.4,
    },
  },
}

const mdVariants = {
  open: {
    width: '60%',
  },
  closed: {
    width: '100%',
    transition: {
      delay: 0.4,
    },
  },
}

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = props => {
  const { state } = useApp()

  const [mqWidderThan768] = useMediaQuery(['(min-width: 768px)'])

  return (
    <Box h="100vh" maxW="100vw" overflowY="scroll" position="relative">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Crypto list" name="description" />
        <meta content="Nathaly" name="author" />
        <meta content="nasterboost" name="author" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@nasterboost" name="twitter:site" />
        <meta content="@nasterboost" name="twitter:creator" />
        <meta content="Crypto list" property="og:site_name" />
        <meta content="website" property="og:type" />
        <title>Crypto List</title>
      </Head>

      <Header bg="gray.800" pos="sticky" top="0" zIndex="sticky" />

      <HStack h="full" w="full">
        <Sidebar maxW={{ base: 'full', md: '40%' }} />

        <MotionBox
          animate={!state.sidebarCollapsed ? 'open' : 'closed'}
          h="full"
          variants={!mqWidderThan768 ? baseVariants : mdVariants}
        >
          {props.children}
        </MotionBox>
      </HStack>
    </Box>
  )
}
