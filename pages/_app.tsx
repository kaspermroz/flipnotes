import { AppProps } from 'next/app';
import { CSSReset } from '@chakra-ui/react';
import { NextPage } from 'next';
import Chakra from '@components/Chakra';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <CSSReset />
      <Component {...pageProps} />
    </Chakra>
  );
};

export default MyApp;
