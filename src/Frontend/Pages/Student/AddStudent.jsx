import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Mail,Lock,User,ArrowRight,Eye,EyeOff,Phone, VenusAndMars, School2
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../../Components/Toast";
import axios from "axios";
import { SignupStudent, GetAllClass } from "../../Route";
import { setStudentData } from "../../../Store/slice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../Components/Elements/Input";
import SelectDropdown from "../../Components/Elements/SelectDropdown";

const AddStudents = () => {
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
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const students = useSelector((state) => state.userData.StudentData);
  // Gender options
  const genderOptions = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
  ];

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${url}${GetAllClass}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassData(response.data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const onSubmit = async (data) => {
    const st_data = {
      name: data.name,
      email: data.email,
      password: data.password,
      parentContact: data.parentContact,
      parentName: data.parentName,
      studentClass: selectedClass,
      gender: selectedGender
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}${SignupStudent}`,
        st_data,
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
        dispatch(setStudentData([...students, st_data]))
        setToastMessage("Registration successful");
        setToastIcon("right");
        setShowToast(true);
        reset();
        setSelectedClass("");
        setSelectedGender("");
      } else if (response.status === 500) {
        setToastMessage("Student Already exist");
        setToastIcon("wrong");
        setShowToast(true);
      } else {
        setToastMessage("Registration failed");
        setToastIcon("wrong");
        setShowToast(true);
      }
    } catch (error) {

      setToastMessage(error.response.data.message);
      setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full max-w-3xl flex items-center justify-center p-6">
      {showToast && (
        <div className="fixed z-100">
          <Toast message={toastMessage} iconName={toastIcon} />
        </div>
      )}
      <div className="h-full w-full space-y-12 bg-white">
        <div className="text-left">
          <h2 className="h2 text-black mt-5 flex flex-col items-start">
            Add Students
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-8 mb-4"
        >
          <Input
            id="name"
            name="name"
            label="Student Name"
            register={register}
            errors={errors}
            required="Name is required"
            placeholder="Full Name"
            icon={User}
            className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
          />
          
          <Input
            id="email"
            name="email"
            label="Student Email/Admission No."
            register={register}
            errors={errors}
            required="Email is required"
            type="email"
            placeholder="Email Address"
            icon={Mail}
            validation={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
          />
          
          <Input
            id="parentName"
            name="parentName"
            label="Parent Name"
            register={register}
            errors={errors}
            required="Parent name is required"
            placeholder="Parent Name"
            icon={User}
            className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
          />
          
          <Input
            id="parentContact"
            name="parentContact"
            label="Parent Contact"
            register={register}
            errors={errors}
            required="Parent contact is required"
            type="text"
            placeholder="Parent Contact"
            icon={Phone}
            validation={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid contact number",
              },
            }}
            className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
          />
          
          <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
            <SelectDropdown
              options={classData || []}
              selectedValue={selectedClass}
              onSelect={setSelectedClass}
              displayField="className"
              valueField="_id"
              placeholder="Select Class"
              icon={<School2 size={20} />}
              required={true}
        
            />
          </div>
          
          <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
           
                <SelectDropdown
                     options={genderOptions}
                     selectedValue={selectedGender}
                     onSelect={setSelectedGender}
                      displayField="name"
                      valueField="value"
                      placeholder="Select Gender"
                      icon={<VenusAndMars size={20} />}
                     required={true}
                    />



          </div>
          
          <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto relative">
            <Input
              id="password"
              name="password"
              label="Password"
              register={register}
              errors={errors}
              required="Password is required"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              icon={Lock}
              validation={{
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              className="w-full"
            />
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
          </div>
          
          <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              register={register}
              errors={errors}
              required="Please confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              icon={Lock}
              validation={{
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Passwords do not match";
                  }
                },
              }}
              className="w-full"
            />
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
          </div>
          
          <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;