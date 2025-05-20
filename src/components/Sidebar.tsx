import { BiLogOut, BiMessageSquare } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { TbLogs } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router";
import { useLogoutMutation } from "../Redux/features/auth/authApi";
import { logoutUser } from "../Redux/features/auth/authSlice";
import { useAppDispatch } from "../Redux/hook";

interface ISidebarProps {
  toggleSidebar: () => void;
}
const Sidebar = ({ toggleSidebar }: ISidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const res = await logout(null);
    console.log("🚀 ~ handleLogout ~ res:", res)
    dispatch(logoutUser());
    navigate("/sign-in");
  };
  return (
    <div className="bg-[#f7f7f7] min-h-screen p-4 rounded-xl sticky top-2">
      <div className="flex items-center justify-between gap-4 pl-3 pb-2 mb-2 border-b border-gray-200">
        <h2 className="text-primary text-lg sm:text-xl font-semibold">
          Admin Dashboard
        </h2>
        <button
          className="flex lg:hidden items-center space-x-2 p-2 rounded-md hover:bg-gray-200 text-gray-700"
          onClick={toggleSidebar}
        >
          <CgClose className="size-5" />
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          <NavLink
            onClick={toggleSidebar}
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700 duration-300 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            <FaHome className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleSidebar}
            to="/blog-management"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700 duration-300 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            <TbLogs className="h-5 w-5" />
            <span>Blog Management</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleSidebar}
            to="/project-management"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700 duration-300 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            <GoProject className="h-5 w-5" />
            <span>Project Management</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleSidebar}
            to="/user-messages"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700 duration-300 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            <BiMessageSquare className="h-5 w-5" />
            <span>User Messages</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        type="button"
        className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700 duration-300 w-full"
      >
        <BiLogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
