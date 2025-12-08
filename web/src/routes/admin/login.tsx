import React from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_NAVBAR_LINKS } from "../../components/admin/AdminNavbar";
import { GoogleLogin } from "../../components/GoogleLogin";
import { NavigateLayout } from "../../components/navigate/NavigateLayout";
import { useAuth } from "../../hooks/useAuth";
import { AuthTokenFragment } from "../../sdk/gql/graphql";

export const AdminLoginRoute: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = (token: AuthTokenFragment) => {
    auth.set(token);
    const link = ADMIN_NAVBAR_LINKS.find((link) =>
      token.user.permissions.includes(link.permission),
    );
    navigate(link?.url ?? "/admin/foodboxes");
  };

  return (
    <NavigateLayout title="Log In">
      <div className="flex flex-col items-center gap-4 mt-6">
        <span className="font-bold text-lg text-center">
          Community Food Box Project
        </span>
        <span className="font-medium text-sm">Log into admin panel</span>
        <GoogleLogin onLogin={handleLogin} />
      </div>
    </NavigateLayout>
  );
};
