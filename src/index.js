import './pages/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename="/react-mesto-auth">
      <App />
    </HashRouter>
  </React.StrictMode>
);