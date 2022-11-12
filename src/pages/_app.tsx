import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import Header from '../components/Layout/Header';
import GlobalProvier from '../provider/GlobalProvider';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <QueryClientProvider client={queryClient}>
          <GlobalProvier>
            <Header />
            <Component {...pageProps} />
          </GlobalProvier>
        </QueryClientProvider>
      </Content>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
