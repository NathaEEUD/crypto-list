import React from 'react'
import { Box } from '@chakra-ui/react'
import Head from 'next/head'

import { Sidebar } from '@organisms'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = props => {
  return (
    <Box as="main" h="100vh" overflowY="scroll" position="relative">
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

      <Sidebar />

      {props.children}
    </Box>
  )
}
