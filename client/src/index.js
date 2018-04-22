import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import ConfigureStore from './config_store';

import * as RoutesModule from './routers';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import './style.css';

let routes = RoutesModule.routes;

const store = ConfigureStore();

let history = createBrowserHistory({ basename: "/" });

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history} children={routes} />
</Provider>, document.getElementById('root'));

registerServiceWorker();

