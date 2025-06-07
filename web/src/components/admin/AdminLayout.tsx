import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { ADMIN_NAVBAR_LINKS } from "./AdminNavbar";

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.token && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    } else if (auth.token && /^\/admin\/?$/.test(location.pathname)) {
      navigate("/admin/users");
    }
  }, [navigate, location.pathname, auth.token]);

  const requiredPermission = ADMIN_NAVBAR_LINKS.find(
    ({ url }) => url === location.pathname,
  )?.permission;
  const shouldRender =
    !requiredPermission || auth.isAuthorized(requiredPermission);

  return shouldRender ? <Outlet /> : <p>Insufficient permissions</p>;
};
