import React from 'react';
import ReactDOM from 'react-dom/client';
import TurismoApp from './TurismoApp';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <TurismoApp />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
 