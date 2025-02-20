import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages.jsx/Home.jsx";
import TasksPage from "./pages.jsx/TasksPage.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/task",
    element: (
      <PrivateRoutes>
        <TasksPage />
      </PrivateRoutes>
    ),
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  // </StrictMode>
);
