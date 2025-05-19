import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";

const DashboardOutlet = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex justify-between">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-[300px] absolute left-0 z-[99999] shadow-2xl lg:static duration-300`}
      >
        <Sidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div
        className={`flex-1 bg-[#f7f7f7] rounded-xl lg:ml-3 text-black min-h-screen  ${
          sidebarOpen ? "opacity-70" : "opacity-100"
        } lg:opacity-100 duration-300`}
      >
        <button
          className="lg:hidden absolute top-4 left-2 sm:top-5 sm:left-3 bg-blue-400 rounded-full p-2 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <BiMenu className="size-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default DashboardOutlet;
