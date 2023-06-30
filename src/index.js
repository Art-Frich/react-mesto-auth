import './pages/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-mesto-auth">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);