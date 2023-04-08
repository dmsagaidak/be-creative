import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
