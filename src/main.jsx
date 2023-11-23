import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Provider from "./Components/Provider/Provider.jsx";
import { RouterProvider } from "react-router-dom";
import Route from "./Route/Route.jsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import PropTypes from 'prop-types';
// import { FaBeer } from 'react-icons/fa';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <RouterProvider router={Route}></RouterProvider>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
