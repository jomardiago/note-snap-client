import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import RegisterPage from "./components/pages/register-page.tsx";
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
    element: <h1>Login Page</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
