import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "./redux/store";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/auth");
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect if user role is not in the allowed roles list
      navigate("/");
    }
  }, [user, navigate, allowedRoles]);

  // Show the component's children if the user is authenticated and authorized
  if (!user) {
    return null; // Or a loading spinner
  }

  return <Outlet />;
};

export default ProtectedRoutes;
