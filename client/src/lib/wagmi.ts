
import { http, createConfig } from 'wagmi';
import { bscTestnet } from 'viem/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545')
  },
  connectors: [
    injected({
      target: 'metaMask',
      shimDisconnect: true
    })
  ],
  ssr: false
});

export const chains = [bscTestnet];

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /android|iPad|iPhone|iPod|webOS|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
