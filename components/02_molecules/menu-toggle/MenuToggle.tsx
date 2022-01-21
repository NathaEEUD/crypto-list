import * as React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { MotionPath } from '@atoms'

interface Props {
  toggle: () => void
  isOpen: boolean
}

const MotionButton = motion<ButtonProps>(Button)

export const MenuToggle: React.FC<Props> = ({ toggle, isOpen }) => (
  <MotionButton
    animate={isOpen ? 'open' : 'closed'}
    colorScheme="whiteAlpha"
    variant="outline"
    onClick={toggle}
  >
    <svg height="20" viewBox="0 0 20 20" width="20">
      <MotionPath
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <MotionPath
        d="M 2 9.423 L 20 9.423"
        transition={{ duration: 0.1 }}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
      />
      <MotionPath
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </MotionButton>
)
