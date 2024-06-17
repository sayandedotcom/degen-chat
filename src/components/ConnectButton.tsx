import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaConnect: FC = () => {
  const { publicKey } = useWallet();
  if (publicKey) {
    localStorage.setItem("walletAddress", publicKey.toString());
  }

  return (
    <WalletModalProvider>
      <WalletMultiButton />
    </WalletModalProvider>
  );
};
