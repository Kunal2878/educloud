import { useState } from "react";

import Toast from "../../Components/Toast";
import Cookies from "js-cookie";
const CreateExam = () => {
      const token = Cookies.get('token');
  const [examData, setExamData] = useState({
    name: "",
    date: "",
  });
  const [timeTableFile, setTimeTableFile] = useState(null);
  const [examCreated, setExamCreated] = useState(false);
  const [examId, setExamId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: "", type: "" });
  const url = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/principal/create-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(examData),      
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setExamId(data._id);
        setExamCreated(true);
        setShowToast({ show: true, message: "Exam created successfully!", type: "right" });
      } else {
        throw new Error("Failed to create exam");
      }
    } catch (error) {
      console.error("Error:", error);
      setShowToast({ show: true, message: "Failed to create exam", type: "wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeTableUpload = async () => {
    try {
      if (timeTableFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("timeTable", timeTableFile);

        const timeTableResponse = await fetch(
          `${url}/api/v1/principal/upload-exam-timetable`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!timeTableResponse.ok) {
          throw new Error("Failed to upload time table");
        }
        setShowToast({ show: true, message: "Time table uploaded successfully!", type: "right" });
        // Reset all states after successful upload
        setExamData({ name: "", date: "" });
        setTimeTableFile(null);
        setExamCreated(false);
        setExamId(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowToast({ show: true, message: "Failed to upload time table", type: "wrong" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 flex flex-col justify-start mt-6 sm:py-10">
      {showToast.show && <Toast message={showToast.message} iconName={showToast.type} />}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-6 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  <span className="text-purpleColor">Create</span> New Exam
                </h2>
                {!examCreated ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative mt-6">
                      <input
                        id="examName"
                        type="text"
                        className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                        placeholder="Exam Name"
                        value={examData.name}
                        onChange={(e) =>
                          setExamData({ ...examData, name: e.target.value })
                        }
                        required
                      />
                      <label 
                        htmlFor="examName"
                        className="absolute left-10 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
                      >
                        Exam Name
                      </label>
                    </div>
                    <div className="relative mt-6">
                      <input
                        id="examDate"
                        type="date"
                        className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent [color-scheme:light]"
                        value={examData.date}
                        onChange={(e) =>
                          setExamData({ ...examData, date: e.target.value })
                        }
                        required
                      />
                      <label 
                        htmlFor="examDate"
                        className="absolute left-10 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"
                      >
                        Exam Date
                      </label>
                    </div>
                    <div className="relative mt-8">
                      <button
                        type="submit"
                        className="border-2 border-purpleColor text-purpleColor rounded-md px-6 py-2 w-full transition duration-200 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purpleColor"></div>
                            Creating...
                          </>
                        ) : (
                          'Create Exam'
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">Exam Details</h3>
                      <p>Name: {examData.name}</p>
                      <p>Date: {examData.date}</p>
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <div className="flex justify-start items-center">
                        <label htmlFor="timeTable" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-purple-500 text-purple-500 rounded-full hover:bg-purple-50 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Upload File
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
                        <span className="ml-3 text-sm text-gray-500">Max size: 5MB</span>
                      </div>
                      {timeTableFile && (
                        <p className="text-sm text-gray-600">Selected file: {timeTableFile.name}</p>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={handleTimeTableUpload}
                        className="border-2 border-purpleColor text-purpleColor rounded-md px-6 py-2 w-full transition duration-200 flex items-center justify-center"
                        disabled={isUploading || !timeTableFile}
                      >
                        {isUploading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purpleColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          'Submit Time Table'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;