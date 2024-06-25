import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import App from './App';
import './index.css'
import UserProfilePage from './profile/containers/UserProfilePage/UserProfilePage'
import RecipeDetailPage from './recipes/containers/RecipeDetailPage/RecipeDetailPage';
import HomePage from './home/containers/HomePage/HomePage';
import LandingPage from './landing/containers/LandingPage/LandingPage';
import AuthPage from './auth/containers/Authpage/AuthPage';


const router = createBrowserRouter([
    { path: "/", element: <AuthPage/>},
    { path: "/profile", element: <UserProfilePage/>},
    { path: "/recipe", element: <RecipeDetailPage/>},
    { path: "/home", element: <HomePage/>}
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );