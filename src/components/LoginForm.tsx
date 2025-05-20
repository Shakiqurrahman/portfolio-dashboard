import { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../Redux/features/auth/authApi";
import { setCredentials } from "../Redux/features/auth/authSlice";
import { useAppDispatch } from "../Redux/hook";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = form;

    if (email && password) {
      try {
        const result = await loginUser({ email, password }).unwrap();
        if (result.success) {
          dispatch(setCredentials(result?.data));
          navigate("/");
        }
        toast.success("Login successful!");
      } catch (error) {
        console.error("Operation failed:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("All Fields Are Required!!!");
    }
  };
  return (
    <div className="max-width font-poppins flex flex-col justify-center items-center h-screen">
      <form
        className="max-w-[500px] w-full mx-auto p-8 py-10 bg-white shadow-box rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-semibold select-none">
          Sign In
        </h1>
        <div className="relative mt-5">
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary-blue peer-focus-visible:mt-[2px] inline-block 
                ${
                  form.email
                    ? "text-xs top-0 z-[2] text-primary-blue mt-[2px]"
                    : "top-1/2 text-gray-500 z-0 mt-0"
                }
            `}
          >
            Email
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 pr-10 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary-blue peer-focus-visible:mt-[2px] inline-block ${
              form.password
                ? "text-xs top-0 z-[2] text-primary-blue mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Password
          </label>
          {form.password && (
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer text-primary-blue text-xl select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoggingIn}
          className="disabled:bg-primary/60 flex items-center justify-center w-full text-center h-11 bg-primary hover:bg-primary/85 text-white font-medium mt-5 duration-300 rounded select-none"
        >
          {isLoggingIn ? (
            <CgSpinner className="animate-spin text-xl" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
