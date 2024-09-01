import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/navbar/side-navbar";

const DashboardLayout = () => {
  return (
    <div>
      <SideNavbar />
      <div className="ml-[260px] p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
