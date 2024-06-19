import React from 'react';
import ReactDOM from 'react-dom/client';
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App';
import './index.css'

// const router = createBrowserRouter([
//     { path: "/", element: <AuthPage/>},
//   ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  ); 