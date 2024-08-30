import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={routes} />
    </React.Fragment>
  );
};

export default App;
