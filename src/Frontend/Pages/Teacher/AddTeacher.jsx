import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../../Components/Toast";
import axios from "axios";
import { SignupTeacher } from "../../Route";
const AddTeachers = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}${SignupTeacher}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        setToastMessage("Registration successful");
        setToastIcon("right");
        setShowToast(true);
        reset();
      } else if (response.status === 500) {
        setToastMessage("Teacher Already exist");
        setToastIcon("wrong");
        setShowToast(true);
        reset();
      } else {
        setToastMessage("Registration failed");
        setToastIcon("wrong");
        setShowToast(true);
        reset();
      }
    } catch (error) {
      console.log("inside catch");
      setToastMessage("An error occurred during registration");
      setToastIcon("wrong");
      setShowToast(true);
      reset();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-full max-w-3xl flex items-center justify-center p-6">
      {showToast && (
        <div className="fixed">
          {" "}
          <Toast message={toastMessage} iconName={toastIcon} />
        </div>
      )}
      <div className="h-full w-full  space-y-12 bg-white">
        <div className="text-left">
          <h2 className="h2 text-black mt-5 flex flex-col items-start">
            Add Teachers
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[32px] space-y-8 mb-[16px]"
        >
          <div className="">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-2 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline  rounded-lg transition-all peer placeholder-transparent"
                placeholder="Full Name"
                id="fullName"
              />
              <label
                htmlFor="fullName"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <User size={20} />
                </span>
                Teacher Name
              </label>
              {errors.name && (
                <p className="text-danger text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type="email"
                placeholder="Email Address"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <Mail size={20} />
                </span>
                Teacher Email Address
              </label>
              {errors.email && (
                <p className="text-danger text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type="tel"
                placeholder="Phone Number"
                id="phoneNumber"
              />
              <label
                htmlFor="phoneNumber"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <User size={20} />
                </span>
                Phone Number
              </label>
              {errors.phoneNumber && (
                <p className="text-danger text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("salary", {
                  required: "Salary is required",
                  min: {
                    value: 0,
                    message: "Salary must be a positive number",
                  },
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type="number"
                placeholder="Salary"
                id="salary"
              />
              <label
                htmlFor="salary"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <IndianRupee size={20} />
                </span>
                Salary
              </label>
              {errors.salary && (
                <p className="text-danger text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("qualification", {
                  required: "Qualification is required",
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type="text"
                placeholder="Qualification"
                id="qualification"
              />
              <label
                htmlFor="qualification"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <Briefcase size={20} />
                </span>
                Qualification
              </label>
              {errors.qualification && (
                <p className="text-danger text-sm mt-1">
                  {errors.qualification.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <Lock size={20} />
                </span>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-danger text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Passwords do not match";
                    }
                  },
                })}
                className="w-full px-4 py-2 bg-transparent border-2 border-black-200 text-black-300 focus:outline rounded-lg transition-all peer placeholder-transparent"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
              >
                <span className="text-danger">
                  <Lock size={20} />
                </span>
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-danger text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4  rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                Add
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default AddTeachers;
