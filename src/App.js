import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './configureStore';
import Main from './routes/Main';

export const myStore = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <ConnectedRouter history={history}>
          <Main
            dispatch={myStore.dispatch}
            {...this.props}
          />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
