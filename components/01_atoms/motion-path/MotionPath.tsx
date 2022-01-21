import { motion } from 'framer-motion'
import React from 'react'

interface keyable {
  [key: string]: any
}

interface Props {
  d?: string
  variants: keyable
  transition?: keyable
}

export const MotionPath: React.FC<Props> = props => {
  return (
    <motion.path
      fill="transparent"
      stroke="hsl(0, 0%, 100%)"
      strokeLinecap="round"
      strokeWidth="1"
      {...props}
    />
  )
}
