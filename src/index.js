import React from 'react';
import ReactDOM from 'react-dom/client';
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Reducer from './store/reducer/Reducer';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(
  Reducer,
  applyMiddleware(thunk)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
