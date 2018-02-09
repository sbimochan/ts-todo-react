/* Global imports */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

/* Local imports */
import './index.css';
import myApp from './reducers/index';
import Todo from './components/Todo';
import Login from './components/Login';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Route } from 'react-router-dom';

const middleware = applyMiddleware(createLogger());
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

declare var window: Window;

let store = createStore(
  myApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact={true} path="/" component={Login} />
        <PrivateRoute path="/todo" component={Todo} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
