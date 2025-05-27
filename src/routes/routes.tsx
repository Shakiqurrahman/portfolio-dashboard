import { createBrowserRouter } from "react-router";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import AddBlogPage from "../pages/AddBlogPage";
import AddProjectPage from "../pages/AddProjectPage";
import BlogManagementPage from "../pages/BlogManagementPage";
import EditBlogPage from "../pages/EditBlogPage";
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
      {
        path: "/blog-management/add-blog",
        element: <AddBlogPage />,
      },
      {
        path: "/blog-management/edit/:blogId",
        element: <EditBlogPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
