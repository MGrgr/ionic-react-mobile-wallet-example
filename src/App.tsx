import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {clusterApiUrl} from '@solana/web3.js';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from './components/providers/ConnectionProvider';
import MainScreen from './components/MainScreen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl('devnet');


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <ConnectionProvider
      config={{commitment: 'processed'}}
      endpoint={clusterApiUrl(RPC_ENDPOINT)}>
      <AuthorizationProvider>
        <div>
          <MainScreen />
        </div>
      </AuthorizationProvider>
    </ConnectionProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
