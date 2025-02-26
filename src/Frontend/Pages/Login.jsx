import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Toast from "../Components/Toast";
import { useSelector, useDispatch } from 'react-redux'
const Login = () => {
const role = useSelector((state) => state.userData.role)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      let endpoint = `${url}/api/v1/principal/login`;
      if (role === 'student') {
        console.log("clicked here student")
        endpoint = `${url}/api/v1/student/login`;
      } else if (role === 'teacher') {
        console.log("clicked here teacher")
        endpoint = `${url}/api/v1/teacher/login`;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      console.log("responseData", responseData);
      if (response.ok) {
        Cookies.set("token", role === 'student' ? responseData.data.accessToken : responseData.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(role === 'student' ? responseData.data.student : role === 'teacher' ? responseData.teacher : responseData.user), { expires: 7 });        setToastMessage("Login successful!"), setToastIcon("right");
        setShowToast(true);
        window.location.href = "/dashboard";
      } else {
        setToastMessage({
          message: responseData.message || "Login failed",
          iconName: "wrong",
        });
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("Email or password is incorrect. Please try again."),
        setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-3xl text-black-300">
            <span className="text-black font-bold">
              Welcome to <span className="text-purpleColor">Edu</span>cloud 🚀
            </span>
          </h2>
          {
            role!=='principal'&&(
              <span className="text-purpleColor">Use the same paasword which was sent to your email before</span>
            )
          }
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative mb-6">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black-300" />
              <input
                id="email"
                type="email"
                className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                placeholder="Email address"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <label
                htmlFor="email"
                className="absolute left-10 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
              >
                <span className="text-danger">* </span>Email address
              </label>
            </div>
            <div className="relative mb-6">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black-300" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <label
                htmlFor="password"
                className="absolute left-10 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
              >
                <span className="text-danger">* </span>Password
              </label>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-danger text-sm text-center">{error}</div>
          )}

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4  text-sm font-medium rounded-md text-purpleColor border-2 border-purple-500 transform transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-purpleColor" />
              </span>
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purpleColor"></div>
              ) : (
                <span className="text-lg">Sign in</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;