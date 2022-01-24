import { motion } from 'framer-motion'
import React from 'react'

interface keyable {
  [key: string]: any
}

interface Props {
  d?: string
  variants: keyable
  transition?: keyable
  stroke?: string
}

export const MotionPath: React.FC<Props> = props => {
  return (
    <motion.path
      fill="transparent"
      strokeLinecap="round"
      strokeWidth="1"
      {...props}
    />
  )
}
