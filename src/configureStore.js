import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './redux/reducers'

export const history = createBrowserHistory()

const REACT_APP_DEVTOOLS = process.env.REACT_APP_DEVTOOLS
? JSON.parse(process.env.REACT_APP_DEVTOOLS)
: false;

const middlewares = REACT_APP_DEVTOOLS
  ? composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  : applyMiddleware(
    routerMiddleware(history)
  );

export default function configureStore(preloadedState) {
  //const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    middlewares,
  )
  return store
}