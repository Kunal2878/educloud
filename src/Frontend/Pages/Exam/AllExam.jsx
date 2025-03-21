import { useState, useEffect } from "react";
import Toast from "../../Components/Toast";
import Cookies from "js-cookie";
import { Calendar, Upload, ArrowRight, Eye } from "lucide-react";
import axios from "axios";
import { CreateExam, GetAllExams, UploadExamTimeTable } from "../../Route";

const AllExams = () => {
  const token = Cookies.get("token");
  const url = import.meta.env.VITE_API_BASE_URL;
  const [examData, setExamData] = useState({
    name: "",
    date: "",
  });
  const [timeTableFile, setTimeTableFile] = useState(null);
  const [examCreated, setExamCreated] = useState(false);
  const [examId, setExamId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [exams, setExams] = useState([]);
  const [isLoadingExams, setIsLoadingExams] = useState(false);

  useEffect(() => {
    fetchExams();
    document.title = "Exam Details";
  }, []);

  const fetchExams = async () => {
    setIsLoadingExams(true);
    try {
      const response = await axios.get(`${url}${GetAllExams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("exams: ", response);
      setExams(response.data.data.exams || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setIsLoadingExams(false);
    }
  };

  const resetForm = () => {
    setExamData({ name: "", date: "" });
    setTimeTableFile(null);
    setExamCreated(false);
    setExamId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", examData.name);
      formData.append("date", examData.date);
      if (timeTableFile) {
        formData.append("timetable", timeTableFile);
      }

      const response = await axios.post(
        `${url}${CreateExam}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newExam = response.data;
      setExams((prevExams) => [...prevExams, newExam]);
      setShowToast({
        show: true,
        message: "Exam created successfully!",
        type: "right",
      });
      resetForm();
    } catch (error) {
    
      console.error("Error:", error);
      setShowToast({
        show: true,
        message: error.response.data.message,
        type: "wrong",
      });
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUploadForExam = (examId) => {
    setExamId(examId);
    document.getElementById("timeTable").click();
  };

  return (
    <div className="min-h-screen sm:px-16 px-6 sm:py-16 py-10">
      {showToast.show && (
        <Toast message={showToast.message} iconName={showToast.type} />
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 mb-[64px]">
        <h2 className="h2 mb-[32px] text-left">Create New Exam</h2>

        <div className="flex flex-col md:flex-row gap-[16px] md:gap-[16px]">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative mb-10">
                <input
                  id="examName"
                  type="text"
                  className="w-full px-4 py-2 border-2 bg-transparent border-black-200 text-gray-600 rounded-md shadow-sm focus:outline   transition-all peer placeholder-transparent"
                  placeholder="Exam Name"
                  value={examData.name}
                  onChange={(e) =>
                    setExamData({ ...examData, name: e.target.value })
                  }
                  required
                />
                <label
                  htmlFor="examName"
                  className="absolute left-1 -top-7 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-sm"
                >
                  Exam Name
                </label>
              </div>

              <div className="relative mb-10">
                <input
                  id="examDate"
                  type="date"
                  className="w-full px-4 py-2 border-2 bg-transparent border-black-200 text-black rounded-md shadow-sm focus:outline transition-all peer placeholder-transparent [color-scheme:light]"
                  value={examData.date}
                  onChange={(e) =>
                    setExamData({ ...examData, date: e.target.value })
                  }
                  required
                />
                <label
                  htmlFor="examDate"
                  className="absolute left-1 -top-7 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-sm"
                >
                  Exam Date
                </label>
              </div>

              <div className="relative">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Create
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="md:w-1/3 flex flex-col justify-center  pl-0 md:pl-8">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-3 text-center">
                <h3 className="h3 mb-2">Upload Time Table</h3>
                <p className="subtitle-2">Max size: 5MB</p>
              </div>

              <div className="relative w-full">
                <label
                  htmlFor="timeTable"
                  className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-success-500 text-success-600 rounded-full hover:bg-success-200 transition-all w-full"
                >
                  <Upload size={20} />
                  {timeTableFile ? "Change File" : "Upload File"}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="timeTable"
                  accept=".pdf,.jpg,.png,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size <= 5 * 1024 * 1024) {
                      setTimeTableFile(file);
                    } else {
                      alert("File size should be less than 5 MB");
                      e.target.value = "";
                    }
                  }}
                />
              </div>

              {timeTableFile && (
                <div className="mt-4 w-full">
                  <p className="text-sm text-gray-600 truncate text-center mb-3">
                    Selected: {timeTableFile.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Exams Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="h2 text-black-300">Exam List</h2>

          {/* <div className="relative">
            <input
              type="text"
              className="hidden md:block w-full px-4 py-2 bg-lamaSkyLight text-black border-black-100 rounded-full focus:outline-none"
              placeholder="Search exams..."
            />
          </div> */}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-lamaYellowLight text-black-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-left subtitle-1 text-black-300">
                  Index
                </th>
                <th scope="col" className="px-6 py-3 text-left subtitle-1 text-black-300">
                  Exam Name
                </th>
                <th scope="col" className="px-6 py-3 text-left subtitle-1 text-black-300">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left subtitle-1 text-black-300">
                  Time Table
                </th>
                <th scope="col" className="px-6 py-3 text-left subtitle-1 text-black-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoadingExams ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purpleColor"></div>
                    </div>
                  </td>
                </tr>
              ) : exams.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No exams found
                  </td>
                </tr>
              ) : (
                exams.map((exam, index) => (
                  <tr key={exam._id} className="text-left hover:bg-gray-50 ">
                    <td className="px-6 py-4 subtitle-2 text-black-200">{index + 1}</td>
                    <td className="px-6 py-4 subtitle-2 text-black-200">{exam.name}</td>
                    <td className="px-6 py-4 subtitle-2 text-black-200">
                      {new Date(exam.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 subtitle-2">
                      {exam.timeTableUrl ? (
                        <a
                          href={exam.timeTableUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye
                            size={20}
                            className="text-primaryBlue cursor-pointer"
                          />
                        </a>
                      ) : (
                        <button
                          onClick={() => handleFileUploadForExam(exam._id)}
                          className="text-primaryBlue hover:text-blue-700"
                          title="Click to upload time table"
                        >
                          <Upload className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primaryBlue mr-3">View</button>
                      <button className="text-danger">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExams;
