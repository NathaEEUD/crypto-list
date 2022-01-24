import { Heading, HStack, List, ListItem } from '@chakra-ui/react'
import React from 'react'

import { ICoingeckoResponse } from '@features/coins'

interface Props {
  items: ICoingeckoResponse | undefined
  handleOnClick: (coindId: string) => void
}

export const SearchList: React.FC<Props> = ({ items, handleOnClick }) => {
  return (
    <List py="2" spacing="2" styleType="none">
      {items &&
        items.slice(0, 100).map(item => {
          return (
            <ListItem key={item.id} color="whiteAlpha.800">
              <HStack
                as="button"
                border="1px solid"
                borderColor="gray.600"
                borderRadius="md"
                justify="space-between"
                px={{ base: '2', lg: '4' }}
                py={{ base: '2', lg: '4' }}
                w="full"
                onClick={() => handleOnClick(item.id)}
              >
                <Heading
                  fontSize={{ base: 'sm', lg: 'md' }}
                  fontWeight="normal"
                  size="md"
                  textAlign="left"
                >
                  {item.name}
                </Heading>

                <Heading
                  isTruncated
                  fontSize={{
                    base: 'xs',
                    lg: 'sm',
                  }}
                  textTransform="uppercase"
                >
                  {item.symbol}
                </Heading>
              </HStack>
            </ListItem>
          )
        })}
    </List>
  )
}
