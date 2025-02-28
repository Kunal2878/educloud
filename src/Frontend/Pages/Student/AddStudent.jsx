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
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../../Components/Toast";
const AddStudents = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;
const token=Cookies.get('token');
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/student/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setToastMessage("Registration successful");
        setToastIcon("right");
        setShowToast(true);
        reset(); // Reset form fields after successful submission
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
    <div className="min-h-screen flex items-center justify-center p-4">
      {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">
            Add Students to <span className="text-purpleColor">Edu</span>cloud 🚀
          </h2>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative mb-6">
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              placeholder="Full Name"
              id="fullName"
            />
            <label
              htmlFor="fullName"
              className="absolute left-3 -top-5 text-sm font-medium text-black-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
            >
              <span className="text-danger">* </span>Student Name
            </label>
            {errors.name && (
              <p className="text-danger text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative mb-6">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              type="email"
              placeholder="Email Address"
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
            >
              <span className="text-danger">* </span>Student Email Address/Admission Number
            </label>
            {errors.email && (
              <p className="text-danger text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          

          <div className="relative mb-6">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
            >
              <span className="text-danger">* </span>Password
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

          <div className="relative mb-6">
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Passwords do not match";
                  }
                },
              })}
              className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmPassword"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
            >
              <span className="text-danger">* </span>Confirm Password
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

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4  rounded-lg text-purple-500  focus:outline-none border-2 border-purple-500 hover:scale-[1.02] hover:shadow-lg"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
            ) : (
              <>
               Add
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;