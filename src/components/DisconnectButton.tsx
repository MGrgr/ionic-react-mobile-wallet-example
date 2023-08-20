import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps} from 'react';
import {IonButton} from '@ionic/react';

import {useAuthorization} from './providers/AuthorizationProvider';

type Props = Readonly<ComponentProps<typeof IonButton>>;

export default function DisconnectButton(props: Props) {
  const {deauthorizeSession} = useAuthorization();
  return (
    <IonButton
      {...props}
      onClick={() => {
        transact(async wallet => {
          await deauthorizeSession(wallet);
        });
      }}>
        Disconnect
    </IonButton>
  );
}
