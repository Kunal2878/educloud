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
  const url = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/v1/principal/create-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },

        body: JSON.stringify(examData),      });

      if (response.ok) {
        const data = await response.json();
        setExamId(data._id);
        setExamCreated(true);
        <Toast message="Exam created successfully!" iconName="right" />;
      } else {
        throw new Error("Failed to create exam");
      }
    } catch (error) {
      console.error("Error:", error);
      <Toast message="Failed to create exam" iconName="wrong" />;
    }
  };

  const handleTimeTableUpload = async () => {
    try {
      if (timeTableFile) {
        const formData = new FormData();
        formData.append("timeTable", timeTableFile);

        const timeTableResponse = await fetch(
          `${url}/api/v1/principal/upload-exam-timetable`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData,
          }
        );

        if (!timeTableResponse.ok) {
          throw new Error("Failed to upload time table");
        }
        setExamData({ name: "", date: "" });
        setTimeTableFile(null);
        setExamCreated(false);
        setExamId(null);
        <Toast message="Time table uploaded successfully!" iconName="right" />;
      }
    } catch (error) {
      console.error("Error:", error);
      <Toast message="Failed to upload time table" iconName="wrong" />;
    }
  };

  return (
    <div className="min-h-screen py-4 flex flex-col justify-start mt-20 sm:py-10">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-6 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  <span className="text-purpleColor">Create</span> New Exam
                </h2>
                {!examCreated ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                        placeholder="Exam Name"
                        value={examData.name}
                        onChange={(e) =>
                          setExamData({ ...examData, name: e.target.value })
                        }
                        required
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                        Exam Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent [color-scheme:light]"
                        value={examData.date}
                        onChange={(e) =>
                          setExamData({ ...examData, date: e.target.value })
                        }
                        required
                      />
                      <label className="absolute left-0 -top-3.5 text-black-300 text-sm">
                        Exam Date
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="border-2 border-purpleColor text-purpleColor rounded-md px-6 py-2 w-full transition duration-200"
                      >
                        Create Exam
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
                    <div className="relative">
                      <input
                        type="file"
                        className="w-full px-10 py-2 bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size <= 5 * 1024 * 1024) {
                            setTimeTableFile(file);
                          } else {
                            alert("File size should be less than 5 MB");
                            e.target.value = "";
                          }
                        }}
                        accept=".pdf,.doc,.docx"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                        Upload Time Table
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        onClick={handleTimeTableUpload}
                        className="border-2 border-purpleColor text-purpleColor rounded-md px-6 py-2 w-full transition duration-200"
                      >
                        Upload Time Table
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