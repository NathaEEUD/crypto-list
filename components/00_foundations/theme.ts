import { ColorModeOptions, extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const config: ColorModeOptions = {
  useSystemColorMode: true,
}

const breakpoints = createBreakpoints({
  xs: '320px',
  sm: '575px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
})

const styles = {
  global: {
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
    'html, body': {
      boxSizing: 'border-box',
      minHeight: '100vh',
      backgroundColor: 'gray.800',
      overscrollBehaviorY: 'none',
    },
  },
}

export default extendTheme({
  config,
  breakpoints,
  styles,
})
