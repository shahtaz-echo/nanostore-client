import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const MainLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
