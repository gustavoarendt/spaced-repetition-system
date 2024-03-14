import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BaseLayout from './BaseLayout/BaseLayout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BaseLayout />
  </React.StrictMode>
);
