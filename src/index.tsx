import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { loadState, saveState } from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

const initialState = loadState();

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history, initialState);
store.subscribe(() => {
    saveState(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
