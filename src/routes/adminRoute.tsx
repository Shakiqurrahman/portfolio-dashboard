import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  logoutUser,
  selectCurrentUser,
  useCurrentToken,
} from "../Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = user?.role === "ADMIN";

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!token || !isAdmin) {
      if (token && !isAdmin) {
        setShowModal(true);
        setCountdown(5);

        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
          clearInterval(interval);
          dispatch(logoutUser());
          navigate("/sign-in", { state: { from: location }, replace: true });
        }, 5000);

        return () => {
          clearTimeout(timeout);
          clearInterval(interval);
        };
      } else {
        dispatch(logoutUser());
        navigate("/sign-in", { state: { from: location }, replace: true });
      }
      return;
    }
  }, [token, dispatch, navigate, location, isAdmin]);

  if (!token || !isAdmin) {
    return showModal ? (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700">
            This section is restricted to administrators. Please log in with an
            admin account or wait until you’re granted admin access.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to sign-in page in{" "}
            <span className="font-bold text-lg text-red-600">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      </div>
    ) : null;
  }
  return children;
};

export default AdminRoute;
