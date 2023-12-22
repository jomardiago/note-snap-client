import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import RegisterPage from "./components/pages/register-page.tsx";
import { Toaster } from "@/components/ui/toaster";
import PATHS from "./lib/paths.ts";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    element: <h1>Login Page</h1>,
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
