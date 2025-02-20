import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages.jsx/Home.jsx";

const router = createBrowserRouter([
  { path: "/",
    element: <Home/>
  },
  {
    path: "/todo",
    element: <h3>To DO</h3>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
