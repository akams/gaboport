import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './configureStore';
import Main from './routes/Main';

export const myStore = configureStore();

function App(props) {
  return (
    <Provider store={myStore}>
      <ConnectedRouter history={history}>
        <Main
          dispatch={myStore.dispatch}
          {...props}
        />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;