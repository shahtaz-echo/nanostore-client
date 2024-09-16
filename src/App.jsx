import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={routes} />
      <Toaster />
    </React.Fragment>
  );
};

export default App;
