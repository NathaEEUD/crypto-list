import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react'

import { theme } from '@foundations'
import { Layout } from '@templates'
import { AppProvider } from '@services'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
          },
        },
      }),
  )

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
