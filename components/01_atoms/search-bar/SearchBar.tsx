import { Center, chakra } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React from 'react'

interface Props {
  query: string
  setQuery: (value: string) => void
}

export const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <>
      <chakra.input
        aria-autocomplete="list"
        autoComplete="off"
        autoCorrect="off"
        bg="gray.700"
        color="whiteAlpha.800"
        maxLength={64}
        placeholder="Search for coins"
        spellCheck="false"
        sx={{
          w: '100%',
          h: '68px',
          pl: '68px',
          fontWeight: 'medium',
          outline: 0,
        }}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <Center h="68px" left={7} pos="absolute">
        <SearchIcon boxSize="20px" color="teal.500" />
      </Center>
    </>
  )
}
