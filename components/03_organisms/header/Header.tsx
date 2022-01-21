import { SearchIcon } from '@chakra-ui/icons'
import { HStack, IconButton, PropsOf, Text } from '@chakra-ui/react'
import React from 'react'

import { MenuToggle } from '@molecules'
import { useApp } from '@services'

type Props = PropsOf<typeof HStack>

export const Header: React.FC<Props> = props => {
  const { state, dispatch } = useApp()

  return (
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
      <IconButton aria-label="Search" icon={<SearchIcon />} variant="outline" />
    </HStack>
  )
}
