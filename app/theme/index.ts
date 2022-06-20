import { Theme, extendTheme } from '@chakra-ui/react';

export const theme: Partial<Theme> = extendTheme({
  styles: {
    global: {
      'html, body': {
        background: '#e5e5e5'
      }
    }
  }
})