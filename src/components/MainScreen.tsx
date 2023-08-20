import React, {useCallback, useEffect, useState} from 'react';

import {Section} from '../components/Section';
import ConnectButton from '../components/ConnectButton';
import AccountInfo from '../components/AccountInfo';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import SignMessageButton from '../components/SignMessageButton';
import SignTransactionButton from '../components/SignTransactionButton';

export default function MainScreen() {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  return (
    <>
      <div style={styles.mainContainer}>
        <div style={styles.scrollContainer}>
          {selectedAccount ? (
            <>
              <Section title="Sign a transaction">
                <SignTransactionButton />
              </Section>

              <Section title="Sign a message">
                <SignMessageButton />
              </Section>
            </>
          ) : null}
        </div>
        {selectedAccount ? (
          <AccountInfo
            selectedAccount={selectedAccount}
            balance={balance}
            fetchAndUpdateBalance={fetchAndUpdateBalance}
          />
        ) : (
          <ConnectButton title="Connect wallet" />
        )}
        <div>Selected cluster: {connection.rpcEndpoint}</div>
      </div>
    </>
  );
}

const styles = {
  mainContainer: {
    height: '100%',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'column',
    paddingVertical: 4,
  },
}
