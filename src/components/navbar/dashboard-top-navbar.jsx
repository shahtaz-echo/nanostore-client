import React from "react";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../../utiles/cookies";

const DashboardTopNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearCookies();
    navigate("/sign-in");
  };
  return (
    <div className="flex justify-between py-3 px-6">
      <div></div>
      <div>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardTopNavbar;
