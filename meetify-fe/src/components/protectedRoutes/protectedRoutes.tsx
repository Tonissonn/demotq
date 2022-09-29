import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteType {
  user?: UserDTO;
  children?: JSX.Element;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({
  user,
  redirectPath = "/login",
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
export default ProtectedRoute;
