import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../../Components/Toast";
import { education, educloud, onboarding } from "../../../assets";
import axios from "axios";
import {SignupPrincipal} from '../../Route'
const RegisterPrincipal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/v1/${SignupPrincipal}`, data);
      if (response.status === 200) {
        setToastMessage("Registration successful");
        setToastIcon("right");
        setShowToast(true);
      } else {
        setToastMessage("Registration failed");
        setToastIcon("wrong");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("An error occurred during registration");
      setToastIcon("wrong");
      setShowToast(true);
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
      <section className="flex-1 relative">
        <div className="h-screen overflow-y-auto px-[5%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                <h1 className="text-[32px] md:text-[36px] leading-[36px] font-bold">
                  Welcome 👋
                </h1>
                <h2 className="mt-6 text-black">
                  Get Started with <span className="text-purpleColor">Edu</span>
                  cloud 🚀
                </h2>
                <p className="text-black-300">
                  <i>
                    Be the part of EduCloud! The perfect platform to shape the future
                    of education
                  </i>
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-10">
                <div className="relative mb-7">
                  <input
                    id="fullName"
                    type="text"
                    className="h-11 w-full px-3 py-2 bg-transparent border-2 border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-2 -top-6 flex items-center gap-2 text-base font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
                  >
                    <span className="text-danger">
                      <User size={20} />
                    </span>
                    Full Name
                  </label>
                  {errors.name && (
                    <p className="text-danger text-base mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-7">
                  <input
                    id="email"
                    type="email"
                    className="h-11 w-full px-3 py-2 bg-transparent border-2 border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                    placeholder="Email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
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
                  {errors.email && (
                    <p className="text-danger text-base mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-7">
                  <input
                    id="experience"
                    type="number"
                    className="h-11 w-full px-3 py-2 bg-transparent border-2 border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                    placeholder="Experience"
                    {...register("experience", {
                      required: "Experience is required",
                      min: {
                        value: 0,
                        message: "Experience cannot be negative",
                      },
                    })}
                  />
                  <label
                    htmlFor="experience"
                    className="absolute left-2 -top-6 flex items-center gap-2 text-base font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
                  >
                    <span className="text-danger">
                      <CalendarDays size={20} />
                    </span>
                    Experience (in years)
                  </label>
                  {errors.experience && (
                    <p className="text-danger text-base mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-7">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-11 w-full px-3 py-2 bg-transparent border-2 border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 -top-6 text-base flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
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
                  {errors.password && (
                    <p className="text-danger text-base mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-7">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-11 w-full px-3 py-2 bg-transparent border-2 border-black-200 text-gray-600  rounded-md focus:outline   peer placeholder-transparent"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-3 -top-6 text-base flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-base"
                  >
                    <span className="text-danger">
                      <Lock size={20} />
                    </span>
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-black" />
                    ) : (
                      <Eye className="h-5 w-5 text-black" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-danger text-base mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 text-base font-medium rounded-md text-white border-2 bg-success-500 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <span className="text-lg">Register</span>
                  )}
                </button>
              </div>

              <div className="text-center text-black my-4">
                Already have an account?{" "}
                <Link to="/login" className="text-purpleColor font-semibold">
                  Login
                </Link>
              </div>
            </form>

            <div className="text-14-regular mt-20 flex justify-between pb-16 lg:pb-18">
              <p className="justify-items-end text-black-300 xl:text-left">
                © 2025 EduCloud. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </section>

      <img
        src={onboarding}
        alt="Knowledge is Liberation"
        height={1000}
        width={1000}
        className="hidden object-cover h-screen max-w-[50%] md:block"
      />
    </div>
  );
};

export default RegisterPrincipal;