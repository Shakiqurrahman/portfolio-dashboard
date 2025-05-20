import { createBrowserRouter } from "react-router";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import AdminRoute from "./adminRoute";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: "<h1>Hello world</h1>",
  },
  {
    path: "/",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
