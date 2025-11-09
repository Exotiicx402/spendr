import { Cryptocurrency } from "@/types";

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "/bitcoin.svg",
    color: "#F7931A",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/ethereum.svg",
    color: "#627EEA",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: "/usdc.svg",
    color: "#2775CA",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "/tether.svg",
    color: "#26A17B",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "/solana.svg",
    color: "#14F195",
  },
];

export const getCryptoById = (id: string): Cryptocurrency | undefined => {
  return cryptocurrencies.find((crypto) => crypto.id === id);
};

export const getCryptosByIds = (ids: string[]): Cryptocurrency[] => {
  return cryptocurrencies.filter((crypto) => ids.includes(crypto.id));
};
