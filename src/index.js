import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './Context/AuthContext'
import PostContextProvider from './Context/PostContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider> 
      <PostContextProvider>
    <App />
    </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


reportWebVitals();
