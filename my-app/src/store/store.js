import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer'

const sagaMiddleware = createSagaMiddleware();

const middleWares = [logger,sagaMiddleware];
const enhancer = compose(
    applyMiddleware(...middleWares)
);

export default function configureStore(preloadedState) {
  const store = createStore(
      rootReducer,
      preloadedState,
      enhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
}