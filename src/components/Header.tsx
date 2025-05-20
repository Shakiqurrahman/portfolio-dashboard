import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import defaultImage from "../assets/no-picture.png";
import {
  selectCurrentUser,
  setCredentials,
  useCurrentToken,
} from "../Redux/features/auth/authSlice";
import { useGetUserDataQuery } from "../Redux/features/user/userApi";
import { useAppSelector } from "../Redux/hook";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: userResponse } = useGetUserDataQuery(null);

  const pathName = location.pathname;
  const pathParts = pathName.split("/").filter(Boolean);
  const handleNavigate = (index: number) => {
    const targetPath = "/" + pathParts.slice(0, index + 1).join("/");
    navigate(targetPath);
  };

  useEffect(() => {
    if (userResponse) {
      dispatch(setCredentials({ accessToken: token, user: userResponse }));
    }
  }, [dispatch, userData, userResponse, token]);
  return (
    <div className="flex items-center gap-2 justify-end lg:justify-between pb-4 border-b border-dashed border-gray-400">
      <h2 className="text-lg font-semibold hidden lg:flex items-center gap-2 flex-wrap">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Dashboard
        </span>

        {pathParts.map((part, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-sm">▸</span>
            <span
              onClick={() => handleNavigate(idx)}
              className="capitalize cursor-pointer hover:underline"
            >
              {decodeURIComponent(part.replace(/-/g, " "))}
            </span>
          </div>
        ))}
      </h2>
      <div className="flex items-center gap-2 ">
        <img
          src={userData?.avatar || defaultImage}
          className="size-12 bg-black/10 rounded-full object-cover"
          alt={userData?.name || "Avatar"}
        />
        <div>
          <h2 className="font-semibold">{userData?.name}</h2>
          <p className="text-sm text-gray-500">{userData?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
