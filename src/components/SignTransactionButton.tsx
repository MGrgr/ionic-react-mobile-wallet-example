import React, {useState, useCallback} from 'react';
import {IonButton} from '@ionic/react';
import {fromUint8Array} from 'js-base64';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-capacitor';
import {Keypair, SystemProgram, Transaction} from '@solana/web3.js';

import {useAuthorization} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';
import {alertAndLog} from '../utils/alertAndLog';

export default function SignTransactionButton() {
  const {connection} = useConnection();
  const {authorizeSession} = useAuthorization();
  const [signingInProgress, setSigningInProgress] = useState(false);

  const signTransaction = useCallback(async () => {
    return await transact(async (wallet: Web3MobileWallet) => {
      // First, request for authorization from the wallet and fetch the latest
      // blockhash for building the transaction.
      const [authorizationResult, latestBlockhash] = await Promise.all([
        authorizeSession(wallet),
        connection.getLatestBlockhash(),
      ]);

      // Construct a transaction. This transaction uses web3.js `SystemProgram`
      // to create a transfer that sends lamports to randomly generated address.
      const keypair = Keypair.generate();
      const randomTransferTransaction = new Transaction({
        ...latestBlockhash,
        feePayer: authorizationResult.publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: authorizationResult.publicKey,
          toPubkey: keypair.publicKey,
          lamports: 1_000,
        }),
      );

      // Sign a transaction and receive
      const signedTransactions = await wallet.signTransactions({
        transactions: [randomTransferTransaction],
      });

      return signedTransactions[0];
    });
  }, [authorizeSession, connection]);

  return (
    <IonButton
      title="Sign Transaction"
      disabled={signingInProgress}
      onClick={async () => {
        if (signingInProgress) {
          return;
        }
        setSigningInProgress(true);
        try {
          const signedTransaction = await signTransaction();
          alertAndLog(
            'Transaction signed',
            'View SignTransactionButton.tsx for implementation.',
          );
          console.log(fromUint8Array(signedTransaction.serialize()));
        } catch (err: any) {
          alertAndLog(
            'Error during signing',
            err instanceof Error ? err.message : err,
          );
        } finally {
          setSigningInProgress(false);
        }
      }}>
      Sign transaction
    </IonButton>
  );
}
