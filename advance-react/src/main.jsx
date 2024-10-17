import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Navbar from "./Navbar.jsx";
import React from "react";
import Layout from "./Layout/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Layout />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus deleniti fugit quae impedit ducimus voluptatibus iusto
          cupiditate neque voluptatum perspiciatis vel libero nulla, aliquid sit
          doloremque modi repellat earum enim est eos maiores consequatur.
          Quidem magnam beatae ullam, dolor qui explicabo reprehenderit, labore
          doloremque facere ut natus accusantium porro omnis vitae?
          Necessitatibus odit maxime earum architecto. Vel asperiores blanditiis
          ut cupiditate reiciendis nulla facilis quo. Nihil accusantium animi
          recusandae totam impedit beatae consequatur, quis tempore ab earum
          nostrum voluptas quia aspernatur reiciendis pariatur unde, quos facere
          dolorum? Eum ipsam, neque aliquam, facilis harum at ut nisi nulla a,
          cupiditate eveniet?
        </p>
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <div>Login Page!</div>,
      },
      {
        path: "/app",
        element: (
          <div>
            <App />
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
