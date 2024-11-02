import React from 'react';

import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import AllRoutes from './src/routes/AllRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AllRoutes/>
      </PersistGate>
    </Provider>
  );
}
