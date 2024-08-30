import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi2";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div className="fixed w-[260px] top-0 left-0 bg-black/90 h-screen text-white py-8">
        <div className="px-5">
          <h2 className="text-xl font-semibold uppercase ">Admin</h2>
          <Link
            to={"/"}
            className="flex items-center gap-2 mt-4 text-sm text-white/60 hover:text-white transition duration-300 w-fit"
          >
            <HiArrowLeft className="mt-1" />
            Back to Home
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <Link
            to="/admin"
            className="flex items-center gap-2 py-3 hover:bg-white/10 px-5 transition duration-300"
          >
            <BsFillGridFill />
            Overview
          </Link>
          <Link
            to="/admin/product-list"
            className="flex items-center gap-2 py-3 hover:bg-white/10 px-5 transition duration-300"
          >
            <MdOutlineFormatListBulleted /> Product List
          </Link>
        </div>
      </div>
      <div className="ml-[260px] p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
