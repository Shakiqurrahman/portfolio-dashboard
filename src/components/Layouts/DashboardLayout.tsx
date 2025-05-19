import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router";
import DashboardOutlet from "../DashboardOutlet";
import Header from "../Header";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <DashboardOutlet>
        {/* {children} */}
        <Header />
        <Outlet />
      </DashboardOutlet>
      <ScrollRestoration />
      <Toaster position="top-center" />
    </main>
  );
};

export default DashboardLayout;
