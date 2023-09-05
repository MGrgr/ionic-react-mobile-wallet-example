import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-capacitor';
import React, {ComponentProps, useState, useCallback} from 'react';
import {IonButton} from '@ionic/react';


import {useAuthorization} from './providers/AuthorizationProvider';
import {alertAndLog} from '../utils/alertAndLog';

type Props = Readonly<ComponentProps<typeof IonButton>>;

export default function ConnectButton(props: Props) {
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } catch (err: any) {
      alertAndLog(
        'Error during connect',
        err instanceof Error ? err.message : err,
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);
  return (
    <IonButton
      {...props}
      disabled={authorizationInProgress}
      onClick={handleConnectPress}>
      Connect
    </IonButton>
  );
}
