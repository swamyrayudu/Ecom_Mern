import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({isAuthenticated, user, children}) {
  const location = useLocation();
  if(location.pathname=='/')
  {
    return <Navigate to="/auth/login" />;
  }
  
  
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register")
    )
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shopping/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin"&& location.pathname.includes("/admin")
  ) {
    return(<Navigate to='/unauth-page'/>)
  }
  if (
    isAuthenticated &&
    user?.role === "admin" && location.pathname.includes("/shopping")
  ) {
    return(<Navigate to='/unauth-page'/>)
  }


  return<>{children}</>
}