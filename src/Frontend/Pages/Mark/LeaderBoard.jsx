import React, { useState, useEffect } from "react";
import {
  Search,
  Loader,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import axios from "axios";
import AddMark from "./AddMark";
import { GetAllClass, GetAllExams } from "../../Route";
import Cookies from "js-cookie";
import Toast from "../../Components/Toast";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const [showAddMark, setShowAddMark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const studentsPerPage = 6;
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}${GetAllClass}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (
          response.data.statusCode === 200 ||
          response.data.statusCode === 201 ||
          response.data.statusCode === 204
        ) {
          setClasses(
            Array.isArray(response.data.data.classes)
              ? response.data.data.classes
              : []
          );
        }
      } catch (err) {
        console.log(err);
        setToastMessage("Error fetching classes");
        setToastIcon("wrong");
        setShowToast(true);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${url}${GetAllExams}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        if (
          response.data.statusCode === 200 ||
          response.data.statusCode === 201 ||
          response.data.statusCode === 204
        ) {
          setExams(
            Array.isArray(response.data.data.exams)
              ? response.data.data.exams
              : []
          );
        }
      } catch (err) {
        setToastMessage("Error fetching exams");
        setToastIcon("wrong");
        setShowToast(true);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            classId: selectedClass,
            examId: selectedExam,
          },
        });
        if (response.data.statusCode === 200) {
          setLeaderboardData(response.data.data);
        }
      } catch (err) {
        setToastMessage("Error fetching leaderboard data");
        setToastIcon("wrong");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [selectedClass, selectedExam]);

  const filteredData = leaderboardData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredData.length / studentsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-12 w-12 animate-spin text-purpleColor" />
      </div>
    );
  }

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
      {showToast && (
        <div className="fixed">
          <Toast message={toastMessage} iconName={toastIcon} />
        </div>
      )}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out ${
          showAddMark
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddMark(false);
          }
        }}
      >
        {showAddMark && (
          <div
            className={`relative rounded-lg w-auto max-h-[90vh] overflow-y-auto bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full ${
              showAddMark
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            } transition-all duration-300 ease-in-out transform origin-center`}
          >
            <button
              onClick={() => setShowAddMark(false)}
              className="absolute top-6 lg:top-6 right-6 p-2 bg-white rounded-full text-black-300 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <AddMark onClose={() => setShowAddMark(false)} />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 mb-2">Leaderboard</h2>
        </div>
        <button
          onClick={() => setShowAddMark(true)}
          className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="bg-white p-2 rounded-md shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 bg-white">
          <div className="relative flex-1 max-w-md text-gray-600 p-2 ml-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full pl-10 pr-4 py-2 border rounded-lg bg-lamaSkyLight text-black-300 transition-all duration-200"
            />
          </div>

          <div className="flex gap-4 mr-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            >
              <option value="">All Classes</option>
              {Array.isArray(classes) &&
                classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
            </select>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="p-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            >
              <option value="">All Exams</option>
              {Array.isArray(exams) &&
                exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto text-black-300 text-base bg-white m-4">
          <table className="w-full min-w-[768px] pb-10">
            <thead>
              <tr className="border-b bg-lamaPurpleLight">
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">Roll No</th>
                <th className="px-6 py-4 text-left">Student's Name</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                >
                  <td className="px-6 py-4">
                    {indexOfFirstStudent + index + 1}
                  </td>
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-lamaPurpleLight text-purpleColor disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-lamaPurpleLight text-purpleColor disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
