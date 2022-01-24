import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  PropsOf,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

import { SearchBar } from '@atoms'
import {
  CoinUtility,
  useGetCoinLists,
  useGetCoinMarkets,
} from '@features/coins'
import { useDebounce } from '@hooks'
import { MenuToggle, SearchList } from '@molecules'
import { useApp } from '@services'

type Props = PropsOf<typeof HStack>

export const Header: React.FC<Props> = props => {
  // Disclosure for the search modal
  const { isOpen, onClose, onOpen } = useDisclosure()

  // App context
  const { state, dispatch } = useApp()

  // Get the list of the coins
  const { data } = useGetCoinLists()

  // Get the list of the coin markets
  const { data: coinMarkets } = useGetCoinMarkets()

  // Get the debounce query value for the search
  const queryDebounced = useDebounce(state.searchQuery, 100)

  // Get the first 100 coins to list on the search modal
  const coinLists = React.useMemo(
    () =>
      !queryDebounced
        ? data?.slice(0, 25)
        : data?.filter(coin =>
            coin.name.toLowerCase().includes(queryDebounced.toLowerCase()),
          ),
    [data, queryDebounced],
  )

  // Update the search query term
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    dispatch({
      type: 'UPDATE_SEARCH_QUERY',
      payload: e?.target.value,
    })
  }

  // Update the selected coin id and close the modal
  const handleOnClick = (coinId: string) => {
    dispatch({
      type: 'UPDATE_COIN_ID',
      payload: coinId,
    })

    onClose()
  }

  // Verify if the selected coin data is in cache
  const coinIdExistsInMarkets =
    coinMarkets && CoinUtility.getByID(state.coinId, coinMarkets)

  return (
    <>
      <HStack
        align="center"
        color="white"
        justify="space-between"
        p="2"
        w="full"
        {...props}
      >
        <MenuToggle
          isOpen={!state.sidebarCollapsed}
          toggle={() =>
            dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSE', payload: '' })
          }
        />

        <Text color="teal" fontSize={{ base: 'lg', lg: 'xl' }}>
          CryptoList
        </Text>

        {Boolean(coinIdExistsInMarkets) ? (
          <IconButton
            aria-label="Search"
            colorScheme="teal"
            icon={<SearchIcon />}
            size="sm"
            variant="outline"
            onClick={onOpen}
          />
        ) : (
          <Button
            colorScheme="teal"
            size="sm"
            variant="outline"
            onClick={() => {
              dispatch({
                type: 'UPDATE_SEARCH_QUERY',
                payload: '',
              })

              dispatch({
                type: 'UPDATE_COIN_ID',
                payload: coinMarkets && coinMarkets[0].id,
              })
            }}
          >
            Reset
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          aria-expanded="true"
          aria-haspopup="listbox"
          bg="transparent"
          maxW="600px"
          overflow="hidden"
          role="combobox"
          rounded="lg"
          shadow="lg"
          top="4vh"
        >
          <Flex align="stretch" pos="relative">
            <SearchBar query={state.searchQuery} onChange={handleOnChange} />
          </Flex>

          <ModalBody
            maxH="66vh"
            p="0"
            sx={{
              '&': {
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
              },
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {isOpen && (
              <Box bg="gray.700" px="4">
                <SearchList handleOnClick={handleOnClick} items={coinLists} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
