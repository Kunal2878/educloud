import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  ArrowRight,
  School,
  Check,
  School2,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import Toast from "../../Components/Toast";
import { CreateClass, GetAllTeacher, GetAllStudent } from "../../Route";
const RegisterClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [students, setStudents] = useState([{ name: "", email: "" }]);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/${GetAllTeacher}`);
        setTeachers(response.data.data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const addStudent = () => {
    setStudents([...students, { name: "", email: "" }]);
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleDeleteStudent = () => {
    if (students.length > 1) {
      setStudents(students.slice(0, -1));
    }
  };

  const handleTeacherSelect = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const selectedTeacherData = teachers.find(
      (teacher) => teacher.email === selectedTeacher
    );
    const studentsData = students
      .map((student) => ({
        name: student.name,
        email: student.email,
      }))
      .filter((student) => student.email && student.name);

    const classData = {
      className: data.className,
      section: data.section,
      classTeacher: selectedTeacherData._id,
      classTeacherEmail: selectedTeacherData.email,
      students: studentsData,
      subjects: [],
      timetable: [],
    };

    try {
      const response = await axios.post(
        `${url}/api/v1/${CreateClass}`,
        classData,
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
        setToastMessage("Class created successfully");
        setToastIcon("right");
        setShowToast(true);
        reset();
      } else if (response.status === 500) {
        setToastMessage("Class already exists");
        setToastIcon("wrong");
        setShowToast(true);
        reset();
      } else {
        setToastMessage("Failed to create class");
        setToastIcon("wrong");
        setShowToast(true);
        reset();
      }
    } catch (error) {
      console.log("inside catch");
      setToastMessage("An error occurred while creating class");
      setToastIcon("wrong");
      setShowToast(true);
      reset();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen sm:px-16 px-6 sm:py-16 py-10 w-full">
      {showToast && (
        <div className="fixed">
          <Toast message={toastMessage} iconName={toastIcon} />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full max-w-4xl mx-auto bg-white rounded-lg  p-2  transition-all duration-300"
      >
        <h2 className="text-xl md:text-2xl text-left font-bold mb-8 md:mb-12 mt-4 text-black-300 italic">
          {" "}
          Register New Class
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-6">
          <div className="relative">
            <input
              {...register("className", { required: true })}
              className="w-full px-4 md:px-10 py-2 bg-transparent border-2  border-black-200 text-gray-600 focus:outline   rounded-md  transition-all peer placeholder-transparent"
              placeholder="Class Name"
              id="className"
            />
            <label
              htmlFor="className"
              className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
            >
              <span className="text-danger">
                <School size={20} />
              </span>
              Class Name <span className="text-gray-400">(eg.1A)</span>
            </label>
          </div>
          <div className="relative">
            <input
              {...register("section", { required: true })}
              className="w-full px-4 md:px-10 py-2 bg-transparent border-2   border-black-200 text-gray-600 focus:outline   rounded-md  transition-all peer placeholder-transparent"
              placeholder="Section"
              id="section"
            />
            <label
              htmlFor="section"
              className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
            >
              <span className="text-danger">
                <School2 size={20} />
              </span>
              Section <span className="text-gray-400">(eg.A)</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-6 text-black">
            Class Teacher Details
          </h3>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
              className="w-full flex items-center justify-between px-2 py-1.5 md:py-2 bg-transparent border-2   border-black-200 text-gray-600  focus:outline   rounded-md  text-sm md:text-base"
            >
              <div className="flex items-center">
                <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-danger" />
                <span className="text-black">
                  {selectedTeacher
                    ? teachers.find((t) => t.email === selectedTeacher)?.name
                    : "Select Teacher"}
                </span>
              </div>
              <ChevronDown size={24} className="text-black" />
            </button>
            {isTeacherDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {teachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    onClick={() => {
                      handleTeacherSelect({ target: { value: teacher.email } });
                      setIsTeacherDropdownOpen(false);
                    }}
                    className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                  >
                    <div
                      className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                        selectedTeacher === teacher.email
                          ? "bg-purpleColor text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedTeacher === teacher.email && (
                        <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />
                      )}
                    </div>
                    {teacher.name} - {teacher.email}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 gap-8 md:gap-12">
          <h3 className="text-lg font-semibold mb-8 text-black">
            Add Students
          </h3>
          {students.map((student, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    handleStudentChange(index, "name", e.target.value)
                  }
                  className="w-full px-4 md:px-10 py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-md transition-all peer placeholder-transparent"
                  placeholder="Student Name"
                  id={`studentName-${index}`}
                />
                <label
                  htmlFor={`studentName-${index}`}
                  className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
                >
                  <span className="text-danger">
                    <GraduationCap size={20} />
                  </span>
                  Student Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={student.email}
                  onChange={(e) =>
                    handleStudentChange(index, "email", e.target.value)
                  }
                  className="w-full px-4 md:px-10 py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-md transition-all peer placeholder-transparent"
                  placeholder="Student Email"
                  id={`studentEmail-${index}`}
                />
                <label
                  htmlFor={`studentEmail-${index}`}
                  className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm"
                >
                  <span className="text-danger">
                    <Mail size={20} />
                  </span>
                  Student Email
                </label>
              </div>
            </div>
          ))}
          <div className="flex gap-4 md:gap-8 mt-6 mb-8 md:mb-16 align-center justify-center">
            <button
              type="button"
              onClick={addStudent}
              className="px-4 py-2 bg-white border-2 text-purpleColor border-purpleColor rounded-full hover:bg-gray-300 transition-all"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleDeleteStudent}
              className="px-4 py-2 bg-white border-2 text-danger border-danger rounded-full hover:bg-gray-300 transition-all"
            >
              -
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 rounded-md bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
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
    </div>
  );
};

export default RegisterClass;
