import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CashierProvider } from './context/CashierContext';
import { FirebaseProvider } from './context/FirebaseContext';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <CashierProvider>
        <App />
      </CashierProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
