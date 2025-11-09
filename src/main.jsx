import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./Components/Router/Router.jsx";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
