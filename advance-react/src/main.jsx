import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import React from "react";
import Layout from "./Layout/Layout.jsx";
import User from "./User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Layout />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, vitae?
        </p>
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <div>Login Page</div>,
      },
      {
        path: "/registration",
        element: <div>Registration Page</div>,
      },
      {
        path: "/User",
        element: <User />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
