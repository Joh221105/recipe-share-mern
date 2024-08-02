import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import UserProfilePage from "./profile/containers/UserProfilePage/UserProfilePage";
import RecipeDetailPage from "./recipes/containers/RecipeDetailPage/RecipeDetailPage";
import LandingPage from "./landing/containers/LandingPage/LandingPage";
import AuthPage from "./auth/containers/Authpage/AuthPage";
import RecipeFormPage from "./recipes/containers/RecipeFormPage/RecipeFormPage";
import SearchPage from "./search/containers/SearchPage/SearchPage";
import SearchResultPage from "./search/containers/SearchResultPage/SearchResultPage";
import EditProfilePage from "./profile/containers/EditProfilePage/EditProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "/recipe", element: <RecipeDetailPage /> },
  { path: "/login", element: <AuthPage /> },
  { path: "/create-recipe", element: <RecipeFormPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/searchresult", element: <SearchResultPage /> },
  { path: "/edit-profile", element: <EditProfilePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
