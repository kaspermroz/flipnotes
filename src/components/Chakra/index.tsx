import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

type ChakraProps = {
  cookies?: string;
};

export const getServerSideProps: GetServerSideProps<ChakraProps> = async ({ req }) => ({
  props: {
    cookies: req.headers.cookie ?? '',
  },
});

const Chakra: FC<ChakraProps> = ({ cookies, children }) => {
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return <ChakraProvider colorModeManager={colorModeManager}>{children}</ChakraProvider>;
};

export default Chakra;
