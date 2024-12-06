// Create a custom theme
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'white'
      }
    }
  }
})

export default theme