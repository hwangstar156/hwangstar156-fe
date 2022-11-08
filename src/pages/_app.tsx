import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
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
