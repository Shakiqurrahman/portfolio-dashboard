import { Outlet, ScrollRestoration } from "react-router";
import DashboardOutlet from "../DashboardOutlet";
import Header from "../Header";

const DashboardLayout = () => {
  return (
    <main>
      <DashboardOutlet>
        <Header />
        <Outlet />
      </DashboardOutlet>
      <ScrollRestoration />
    </main>
  );
};

export default DashboardLayout;
