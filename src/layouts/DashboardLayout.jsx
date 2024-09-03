import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/navbar/side-navbar";
import DashboardTopNavbar from "../components/navbar/dashboard-top-navbar";

const DashboardLayout = () => {
  return (
    <div>
      <SideNavbar />
      <div className="ml-[260px]">
        <DashboardTopNavbar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
