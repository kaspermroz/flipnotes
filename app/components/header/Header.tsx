import type { PropsWithChildren } from 'react';
import {
  Box,
  HStack,
  Text,
  Flex,
} from '@chakra-ui/react';

export const Header = ({children}: PropsWithChildren<any>) => {
  return (
    <Box p={6} pl={12} pr={12}>
      <HStack w="full" align="baseline">
        <Text fontSize="2xl">flipnotes</Text>
        <Flex justify="end" w="full" align="center">
          {children}
        </Flex>
      </HStack>
    </Box>
  )
}