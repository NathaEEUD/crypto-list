import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
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
import { useGetCoinLists } from '@features/coins'
import { useDebounce } from '@hooks'
import { MenuToggle, SearchList } from '@molecules'
import { useApp } from '@services'

type Props = PropsOf<typeof HStack>

export const Header: React.FC<Props> = props => {
  // State for the search query
  const [query, setQuery] = React.useState('')

  // Disclosure for the search modal
  const { isOpen, onClose, onOpen } = useDisclosure()

  // App context
  const { state, dispatch } = useApp()

  // Get the list of the coins
  const { data } = useGetCoinLists()

  // Get the debounce query value for the search
  const queryDebounced = useDebounce(query, 300)

  // Get the first 100 coins to list on the search modal
  const coinLists = React.useMemo(
    () =>
      !queryDebounced
        ? data?.slice(0, 100)
        : data?.filter(coin =>
            coin.name.toLowerCase().includes(queryDebounced.toLowerCase()),
          ),
    [data, queryDebounced],
  )

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

        <Text as="i" fontSize="4xl">
          CryptoList
        </Text>

        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          variant="outline"
          onClick={onOpen}
        />
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
            <SearchBar query={query} setQuery={setQuery} />
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
                <SearchList items={coinLists} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
