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
import RecipeFormPage from './recipes/containers/RecipeFormPage/RecipeFormPage';


const router = createBrowserRouter([
    { path: "/", element: <LandingPage/>},
    { path: "/profile", element: <UserProfilePage/>},
    { path: "/recipe", element: <RecipeDetailPage/>},
    { path: "/home", element: <HomePage/>},
    { path: "/login", element: <AuthPage/>},
    { path: "/create-recipe", element: <RecipeFormPage/>}
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );