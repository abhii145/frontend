import { Navigate, Outlet } from "react-router-dom";
import { AdminSidebar, Header } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";


interface ProtectedRouteProps {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

const PublicLayout = ({ user }) => (
  <>
    <Header user={user} />
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
      <Header user={user} />
      <Outlet />
    </>
  );
};


// const AdminLayout = () => {
//     const { user } = useSelector((state: RootState) => state.user);
//     console.log(user)

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-grow p-6 bg-gray-100">
//         <Outlet />
//       </div>
//     </div>
//   );
// };



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