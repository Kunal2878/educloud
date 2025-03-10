import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  PenSquare,
  GraduationCap,
  Plus,
  Loader,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import RegisterClass from "./RegisterClass";
import axios from "axios";
import { GetAllClass } from "../../Route";
const AllClasses = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddTeacher, setShowAddTeacher] = useState(false);

  const classesPerPage = 10;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}${GetAllClass}`);

        if (response.data.statusCode === 200) {
          setClasses(response.data.data.classes);
        } else {
          setError("Failed to fetch classes");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (classItem.classTeacher?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const handleTimeTableClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg bg-purple-100 text-purple-600 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
    );

    buttons.push(
      <span key="current" className="px-3 py-1">
        {currentPage} of {totalPages || 1}
      </span>
    );

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg bg-lamaPurpleLight text-purpleColor disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center justify-center h-96">
          <Loader className="h-12 w-12 animate-spin text-purpleColor" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row text-black-300 justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 text-2xl font-medium mb-2">All Classes</h2>
          <div className="flex items-center text-sm subtitle-2">
            <span className="mr-2">Classes /</span>
            <span>All Classes</span>
          </div>
        </div>
        <button
          onClick={() => setShowAddTeacher(true)}
          className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span>
            <Plus size={20} />
          </span>
        </button>
      </div>

      <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${
            showAddTeacher
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddTeacher(false);
          }
        }}
      >
        {showAddTeacher && (
          <div
            className={`
        relative rounded-lg w-auto max-h-[90vh] overflow-y-auto 
        bg-white 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-slate-200 
        [&::-webkit-scrollbar-thumb]:rounded-full
        ${
          showAddTeacher
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }
        transition-all duration-300 ease-in-out
        transform origin-center
      `}
          >
            <button
              onClick={() => setShowAddTeacher(false)}
              className="absolute top-6 lg:top-6 right-6 p-2 bg-white rounded-full text-black-300 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <RegisterClass onClose={() => setShowAddTeacher(false)} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md bg-slate-100 text-gray-600">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by class or teacher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto text-black-300 text-base">
          <table className="w-full min-w-[768px] pb-10">
            <thead className="bg-lamaPurpleLight">
              <tr className="border-b">
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="rounded w-4 h-4 bg-white accent-purpleColor"
                  />
                </th>
                <th className="p-4 text-left">Class Teacher</th>
                <th className="p-4 text-left">Class</th>
                <th className="p-4 text-left">Section</th>
                <th className="p-4 text-left">Time Table</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentClasses.map((classItem) => (
                <tr
                  key={classItem._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded w-4 h-4 bg-white accent-purple-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex flex-row justify-center items-center">
                        <GraduationCap size={20} />
                      </div>
                      <span>{classItem.classTeacher?.name || "-"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-left">{classItem.className}</td>
                  <td className="p-4 text-left">{classItem.section}</td>
                  <td className="p-4 text-left">
                    {classItem.timeTable && (
                      <button
                        onClick={() =>
                          handleTimeTableClick(classItem.timeTable)
                        }
                        className="p-1 hover:text-purpleColor transition-colors duration-200 transform hover:scale-110"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-start gap-2">
                      <button className="p-1 hover:text-danger transition-colors duration-200 transform hover:scale-110">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-1 hover:text-purpleColor transition-colors duration-200 transform hover:scale-110">
                        <PenSquare size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bottom-0 max-w-screen-xl border-t p-4 flex justify-between items-center">
        <div className="w-full flex justify-center items-center gap-2">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

const styles = document.createElement("style");
styles.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styles);

export default AllClasses;
