import { createBrowserRouter } from "react-router";
import DashboardLayout from "../components/Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: "<h1>Hello world</h1>",
  },
  {
    path: "/sign-up",
    element: "<h1>Hello world</h1>",
  },
  {
    path: "/",
    element: <DashboardLayout />,
  },
]);
