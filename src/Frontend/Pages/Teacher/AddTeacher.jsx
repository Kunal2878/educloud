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
import { RegisterTeacherAccount } from '../../../service/api';
import Input from '../../Components/Elements/Input';
import PasswordInput from '../../Components/Elements/PasswordInput';

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
    const response = await RegisterTeacherAccount(url, token,data);
    
    if (response.status === 200 || response.status === 204 || response.status === 201) {
      setToastMessage(response.message);
      setToastIcon("right");
      setShowToast(true);
    } 
    else {
      setToastMessage(response.message);
      setToastIcon("wrong");
      setShowToast(true);
      reset();
    }
    setLoading(false);
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
          <Input
            id="fullName"
            type="text"
            label="Teacher Name"
            icon={User}
            register={register}
            name="name"
            errors={errors}
            validation={{
              required: "Name is required"
            }}
          />

          <Input
            id="email"
            type="email"
            label="Teacher Email Address"
            icon={Mail}
            register={register}
            name="email"
            errors={errors}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          <Input
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            icon={User}
            register={register}
            name="phoneNumber"
            errors={errors}
            validation={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number format",
              },
            }}
          />

          <Input
            id="salary"
            type="number"
            label="Salary"
            icon={IndianRupee}
            register={register}
            name="salary"
            errors={errors}
            validation={{
              required: "Salary is required",
              min: {
                value: 0,
                message: "Salary must be a positive number",
              },
            }}
          />

          <Input
            id="qualification"
            type="text"
            label="Qualification"
            icon={Briefcase}
            register={register}
            name="qualification"
            errors={errors}
            validation={{
              required: "Qualification is required",
            }}
          />

          <PasswordInput
            id="password"
            label="Password"
            register={register}
            name="password"
            errors={errors}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            register={register}
            name="confirmPassword"
            errors={errors}
            validation={{
              required: "Please confirm your password",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Passwords do not match";
                }
              },
            }}
          />

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