import { selectCurrentUser } from "../Redux/features/auth/authSlice";
import { useAppSelector } from "../Redux/hook";
import defaultImage from "../assets/no-picture.png";

const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex justify-end items-center gap-2 m-6">
      <img
        src={user?.avatar || defaultImage}
        className="size-12 bg-black/10 rounded-full object-cover"
        alt={user?.name || "Avatar"}
      />
      <div>
        <h2 className="font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default Header;
