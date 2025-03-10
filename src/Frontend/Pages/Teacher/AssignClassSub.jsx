import { useState, useEffect } from "react";
import { Check, ArrowRight,ChevronDown, School, BookOpen, User } from "lucide-react";
import Toast from "../../Components/Toast";
import axios from "axios";
import Cookies from "js-cookie";
import {GetAllClass, GetAllTeacher} from '../../Route'
const AssignClassSub = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("classes");
  const [classData, setClassData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get('token')

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${url}${GetAllClass}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
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

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${url}${GetAllTeacher}`)
        setTeachers(response.data.data.teachers)
      } catch (error) {
        console.error('Error fetching teachers:', error)
      }
    }
    fetchTeachers()
  }, [])

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
  ];

  const handleTeacherSelect = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const toggleClass = (className, classId) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
    setSelectedClassIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedTeacherData = teachers.find(teacher => teacher.email === selectedTeacher);
    try {
      if (activeTab === "subjects") {
        await axios.put(`${url}teacher/${selectedTeacherData._id}/assign-subjects`, {
          subjects: selectedSubjects,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setShowToast({
          show: true,
          message: "Successfully assigned subjects",
          type: "right",
        });
        setSelectedSubjects([]);
      } else {
        await axios.put(`${url}teacher/${selectedTeacherData._id}/assign-classes`, {
          classes: selectedClassIds,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setShowToast({
          show: true,
          message: "Successfully assigned classes",
          type: "right",
        });
        setSelectedClasses([]);
        setSelectedClassIds([]);
      }
      setSelectedTeacher("");
    } catch (error) {
      console.error("Error:", error);
      setShowToast({
        show: true,
        message: `Failed to assign ${activeTab}`,
        type: "wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-4 md:p-8">
      {showToast.show && (
        <Toast message={showToast.message} iconName={showToast.type} />
      )}
      <div className="max-w-2xl mx-auto bg-white rounded-md  p-4 md:p-6">
        <h2 className="text-xl md:text-2xl text-left font-bold mb-8 md:mb-12 mt-4 text-gray-800">
          Assign Classes and Subjects
        </h2>
        <div className="flex mb-4 md:mb-10">
          <button
            className={`flex-1 py-1 md:py-2 px-2 md:px-4 text-sm md:text-base ${
              activeTab === "classes"
                ? "bg-success-500 text-white"
                : "border-2 border-success-500 text-success-500"
            } rounded-l-lg`}
            onClick={() => setActiveTab("classes")}
          >
            <h5 className="h5">Assign Classes</h5>
          </button>
          <button
            className={`flex-1 py-1 md:py-2 px-2 md:px-4 text-sm md:text-base ${
              activeTab === "subjects"
                ? "bg-success-500 text-white"
                : "border-2 border-success-500 text-success-500"
            } rounded-r-lg`}
            onClick={() => setActiveTab("subjects")}
          >
            <h5 className="h5">Assign Subjects</h5>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="mb-8">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 md:py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-md text-sm md:text-base"
              >
                <div className="h5 flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-danger" />
                  <span className="text-black">
                    {selectedTeacher ? teachers.find(t => t.email === selectedTeacher)?.name : "Select Teacher"}
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
                        handleTeacherSelect({ target: { value: teacher.email }})
                        setIsTeacherDropdownOpen(false)
                      }}
                      className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                    >
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                          selectedTeacher === teacher.email
                            ? "bg-purple-500 text-white"
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

          {activeTab === "classes" ? (
            <div className="relative bg-transparent border-2 border-black-200 text-gray-600 rounded-lg focus:outline">
              <button
                type="button"
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className="w-full flex items-center justify-between px-2  py-1.5 md:py-2 border rounded-lg bg-white text-sm md:text-base"
              >
                <div className="flex items-center">
                  <School className="w-4 h-4 md:w-5 md:h-5 mr-2 text-danger" />
                  <span className=" h5 text-black">
                    {selectedClasses.length
                      ? selectedClasses.join(", ")
                      : "Select Classes"}
                  </span>
                </div>
                <ChevronDown size={24} className="text-black" />
              </button>
              {isClassDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {classData.map((classItem) => (
                    <div
                      key={classItem._id}
                      onClick={() =>
                        toggleClass(classItem.className, classItem._id)
                      }
                      className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                    >
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                          selectedClasses.includes(classItem.className)
                            ? "bg-purple-500 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedClasses.includes(classItem.className) && (
                          <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />
                        )}
                      </div>
                      {classItem.className}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative bg-transparent border-2 border-black-200 text-gray-600 rounded-lg focus:outline">
             
              <button
                type="button"
                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 md:py-2 border rounded-lg bg-white text-sm md:text-base"
              >
                <div className="h5 flex items-center gap-2">
                  <BookOpen size={20} className="text-brand" />
                  <span className="text-black">
                    {selectedSubjects.length
                      ? selectedSubjects.join(", ")
                      : "Select subjects"}
                  </span>
                </div>{" "}
                <ChevronDown size={24} className="text-black" />
              </button>

              {isSubjectDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {subjects.map((subject) => (
                    <div
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                    >
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                          selectedSubjects.includes(subject)
                            ? "bg-purple-500  text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedSubjects.includes(subject) && (
                          <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />
                        )}
                      </div>
                      {subject}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {activeTab === "classes" ? "Assign Classes" : "Assign Subjects"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignClassSub;