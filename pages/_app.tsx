import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../theme';
import '../styles.css';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}