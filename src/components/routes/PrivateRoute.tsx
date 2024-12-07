import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../core/Users/context/auth.context";

export const PrivateRoute = () => {
  const { isLogin } = useAuth();
  return isLogin() ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
};
