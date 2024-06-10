import React, { version } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import authReducer from "./state/authSlice.js";
import petsReducer from "./state/petsSlice.js";
import requestsReducer from "./state/requestsSlice.js";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: "root", 
  storage, 
  whitelist: ['auth', 'pets', 'requests'] 
}

const rootReducer = combineReducers({
  auth: authReducer,
  pets: petsReducer,
  requests: requestsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER
          ],
        },
      }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
