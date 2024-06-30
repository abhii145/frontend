import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import {  UserProps } from "./types";


interface ProtectedRouteProps {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

const PublicLayout = ({ user, searchQuery, setSearchQuery }: UserProps) => (
  <>
    <Header user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <Outlet />
  </>
);



const PrivateLayout = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};




const AdminProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (adminOnly && !admin) return <Navigate to={redirect} />;
  return <>{children ? children : <Outlet />}</>;
};


export { PublicLayout, PrivateLayout, AdminProtectedRoute };