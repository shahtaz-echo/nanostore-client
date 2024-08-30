import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import ProductDetails from "../pages/Products/product-details";
import ProductList from "../dashboard/products";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../dashboard/overview";
import AddProduct from "../dashboard/products/add-products";
import Checkout from "../pages/Checkout";
import UpdateProduct from "../dashboard/products/edit-products";
import RegisterPage from "../auth/register";
import LoginPage from "../auth/login";

export const routes = createBrowserRouter([
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { path: "/admin", element: <Overview /> },
      { path: "/admin/product-list", element: <ProductList /> },
      { path: "/admin/product-list/add-new", element: <AddProduct /> },
      {
        path: "/admin/product-list/update-product",
        element: <UpdateProduct />,
      },
    ],
  },
]);
