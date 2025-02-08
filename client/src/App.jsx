import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AuthLayout from "./components/auth/layout";
import Adminlayout from "./components/admin-view/layout";
import AdminDashbord from "./pages/admin-view/Dashbord";
import AdminProducts from "./pages/admin-view/Products";
import AdminFeatures from "./pages/admin-view/Fewtures";
import AdminOrders from "./pages/admin-view/Orders";
import ShoppingLayout from "./components/shopping-view/layout";
import Notfound from "./components/not-found/Notfound";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/commen/cumonAuth";
import Unauthpage from "./components/not-found/unauthpage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAction } from "./store/authSlice";
import Load from "./components/loading/load";
import ProductDetails from "./components/shopping-view/product-details";
import Search from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAction());
  }, [dispatch]);
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Load />
      </div>
    );
  return (
    <>
      <div className="overflow-hidden bg-white flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Adminlayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashbord />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          <Route
            path="/shopping"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="search" element={<Search />} />
          </Route>

          <Route path="*" element={<Notfound />} />
          <Route path="/unauth-page" element={<Unauthpage />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
