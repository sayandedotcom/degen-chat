import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";

import("@solana/wallet-adapter-react-ui/styles.css");

const RPC_URL = import.meta.env.RPC_URL;

interface SolanaConnectProps {
  setShowVerifying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWalletTransactionsError: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SolanaConnect: React.FC<SolanaConnectProps> = ({
  setShowVerifying,
  setShowWalletTransactionsError,
}) => {
  const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/CwAHzUC5jUzVVsJIbIsbf6r_BbbiiDBu");
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  if (publicKey) {
    localStorage.setItem("walletAddress", publicKey.toString());
  }
  useEffect(() => {
    if (publicKey) {
      setShowVerifying(true);
      const getTransactionCount = async (walletAddress: string) => {
        try {
          const publicKey = new PublicKey(walletAddress);
          const confirmedSignatures = await connection.getSignaturesForAddress(
            publicKey
          );
          const transactionsCount = confirmedSignatures.length;
          console.log(transactionsCount);
          if (transactionsCount > 10) {
            return navigate("/chat");
          } else {
            setShowWalletTransactionsError(true);
          }
        } catch (error) {
          console.error("Error fetching transaction count:", error);
          return 0;
        }
      };
      getTransactionCount(publicKey.toString());
    }
  }, [publicKey]);

  return (
    <WalletModalProvider>
      <WalletMultiButton />
    </WalletModalProvider>
  );
};
