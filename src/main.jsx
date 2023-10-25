import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; 
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <PrimeReactProvider>
    <App/>
  </PrimeReactProvider>
  </BrowserRouter>
</React.StrictMode>
);

reportWebVitals();
