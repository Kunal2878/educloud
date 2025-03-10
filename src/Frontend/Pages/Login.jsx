import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Toast from "../Components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { education, educloud, onboarding } from "../../assets";
import axios from "axios";
import {Link} from 'react-router-dom'
import {LoginPrincipal,LoginStudent, LoginTeacher} from '../Route'

const Login = () => {
  const role = useSelector((state) => state.userData.role);

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

    console.log(data);

    try {
      let endpoint = `${url}${LoginPrincipal}`;
      if (role === "student") {
        console.log("clicked here student");
        endpoint = `${url}${LoginStudent}`;
      } else if (role === "teacher") {
        console.log("clicked here teacher");
        endpoint = `${url}${LoginTeacher}`;
      }

      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password,
      });

      const responseData = response.data;
      console.log("responseData", responseData);
      if (response.status === 200) {
        Cookies.set(
          "token",
          role === "student"
            ? responseData.data.accessToken
            : responseData.token,
          { expires: 7 }
        );
        Cookies.set(
          "user",
          JSON.stringify(
            role === "student"
              ? responseData.data.student
              : role === "teacher"
              ? responseData.teacher
              : responseData.user
          ),
          { expires: 7 }
        );
        setToastMessage("Login successful!"), setToastIcon("right");
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
    <div className="flex h-screen max-h-screen">
      {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
      <section className="relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
          <img
            src={education}
            height={1000}
            width={1000}
            alt="education"
            className="mb-12 h-10 w-fit"
          />

          <div>
            <div className="mb-12 space-y-4 text-left">
              <h1 className="text-black text-[32px] md:text-[36px] leading-[36px] font-bold">
                Hi there 👋
              </h1>
              <h2 className="mt-6 text-black">
                Get Started with <span className="text-purpleColor">Edu</span>
                cloud 🚀
              </h2>
              {role !== "principal" && (
                <span className="text-purpleColor">
                  Use the same paasword which was sent to your email before
                </span>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-10">
              <div className="relative mb-7">
                <input
                  id="email"
                  type="email"
                  className="h-11 w-full px-3 py-2 bg-transparent border-2  border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                  placeholder="Email address"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 -top-6 flex items-center gap-2 text-base font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
                >
                  <span className="text-danger">
                    <Mail size={20} />
                  </span>
                  Email address
                </label>
              </div>
              <div className="relative mb-7">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-11 w-full px-3 py-2 bg-transparent border-2  border-black-200 text-gray-600 rounded-md shadow-sm focus:outline   peer placeholder-transparent"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 -top-6 text-base flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
                >
                  <span className="text-danger">
                    <Lock size={20} />
                  </span>
                  Password
                </label>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-black" />
                  ) : (
                    <Eye className="h-5 w-5 text-black" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-danger text-base text-center">{error}</div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 text-base font-medium rounded-md text-white border-2 bg-success-500 transform transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn size={24} />
                </span>
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span className="text-lg">Sign in</span>
                )}
              </button>
            </div>
            {role === 'principal' && (
              <div className="text-center text-black my-4">
                Don't have an account?{" "}
                <Link to="/admin-signup" className="text-purpleColor font-semibold">
                  Register
                </Link>
              </div>
            )}
            
          </form>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-black-300 xl:text-left">
              © 2025 EduCloud. All rights reserved
            </p>
          </div>
        </div>
      </section>

      <img
        src={onboarding}
        alt="Knowledge is Liberation"
        height={1000}
        width={1000}
        className="hidden object-cover h-full max-w-[50%] md:block"
      />
    </div>
  );
};

export default Login;
