import React from 'react';
import ReactDOM from 'react-dom';
import { reducer } from './Unit3-React-Folder/reducers/reducer';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
 <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
