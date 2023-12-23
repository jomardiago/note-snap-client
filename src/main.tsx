import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import RegisterPage from "./components/pages/register-page/register-page.tsx";
import LoginPage from "./components/pages/login-page/login-page.tsx";

import { Toaster } from "@/components/ui/toaster";
import PATHS from "./lib/paths.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <App />,
  },
  {
    path: PATHS.register,
    element: <RegisterPage />,
  },
  {
    path: PATHS.login,
    element: <LoginPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
