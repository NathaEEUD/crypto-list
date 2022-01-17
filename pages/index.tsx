import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

import { Home } from '@templates'
import { prefetchCoins, useGetCoins } from 'features/coins'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      dehydratedState: await prefetchCoins(),
    },
  }
}

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading } = useGetCoins()

  console.log(data)

  return <Home data={data} isLoading={isLoading} />
}

export default Index
