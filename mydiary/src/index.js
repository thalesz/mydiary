import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AutoProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='/*' element={<App/>} /> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>    
  </React.StrictMode>
);


