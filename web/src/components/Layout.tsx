import type React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export const Layout: React.FC = () => (
  <>
    <Outlet />
    <ToastContainer />
  </>
);
