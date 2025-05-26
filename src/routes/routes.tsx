import { createBrowserRouter } from "react-router";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import AddProjectPage from "../pages/AddProjectPage";
import BlogManagementPage from "../pages/BlogManagementPage";
import EditProjectPage from "../pages/EditProjectPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ProjectManagementPage from "../pages/ProjectManagementPage";
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
    children: [
      {
        path: "/project-management",
        element: <ProjectManagementPage />,
      },
      {
        path: "/project-management/add-project",
        element: <AddProjectPage />,
      },
      {
        path: "/project-management/edit/:projectId",
        element: <EditProjectPage />,
      },
      {
        path: "/blog-management",
        element: <BlogManagementPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
