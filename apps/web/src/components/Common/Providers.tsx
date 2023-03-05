import { ApolloProvider } from '@apollo/client';
import { initLocale } from '@lib/i18n';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ALCHEMY_KEY, IS_MAINNET } from 'data/constants';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import client from '../../apollo';
import ErrorBoundary from './ErrorBoundary';
import Layout from './Layout';

import { MagicAuthConnector } from '@everipedia/wagmi-magic-connector';

const { chains, provider, webSocketProvider } = configureChains(
  [IS_MAINNET ? polygon : polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_KEY })]
);

const connectors = () => {
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({ chains, options: {} }),
    new MagicAuthConnector({
      options: {
        magicSdkConfiguration: {
          network: {
            chainId: IS_MAINNET ? 137 : 80001,
            rpcUrl: IS_MAINNET ? 'https://rpc-mainnet.maticvigil.com' : 'https://rpc-mumbai.maticvigil.com'
          }
        },
        apiKey: 'pk_live_1E39FE6CAD5D528A'
      }
    })
  ];
};

const wagmiClient = createClient({
  autoConnect: true,
  // @ts-ignore
  connectors,
  provider,
  webSocketProvider
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initLocale();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <ErrorBoundary>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider defaultTheme="light" attribute="class">
                <Layout>{children}</Layout>
              </ThemeProvider>
            </QueryClientProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ErrorBoundary>
    </I18nProvider>
  );
};

export default Providers;
