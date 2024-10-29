import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import UserProfilePage from "./profile/containers/UserProfilePage";
import RecipeDetailPage from "./recipes/containers/RecipeDetailPage";
import LandingPage from "./landing/containers/LandingPage";
import AuthPage from "./auth/containers/AuthPage";
import RecipeFormPage from "./recipes/containers/RecipeFormPage";
import SearchPage from "./search/containers/SearchPage";
import SearchResultPage from "./search/containers/SearchResultPage";
import EditProfilePage from "./profile/containers/EditProfilePage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
  { path: "/", element: <LandingPage /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "/recipe/:recipeId", element: <RecipeDetailPage /> },
  { path: "/login", element: <AuthPage /> },
  { path: "/create-recipe", element: <RecipeFormPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/searchresult", element: <SearchResultPage /> },
  { path: "/edit-profile", element: <EditProfilePage /> },
],
},
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
