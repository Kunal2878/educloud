import React, { useState, useEffect } from "react";
import {
  Search,
  Loader,
  Trash2,
  PenSquare,
  GraduationCap,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import AddStudents from "../../Pages/Student/AddStudent";
import { Link } from "react-router-dom";
const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState("");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const studentsPerPage = 6;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://school-backend-ocze.onrender.com/api/v1/student/getallstudents"
        );
        const data = await response.json();

        if (data.statusCode === 200) {
          setStudents(data.data.students);
        } else {
          setError("Failed to fetch students");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search and class
  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const classMatch =
      timeFilter === "" || student.studentClass?.className === timeFilter;
    return nameMatch && classMatch;
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

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

    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-1 rounded-lg ${
          currentPage === 1
            ? "bg-purple-600 text-white"
            : "bg-purple-100 text-purple-600"
        }`}
      >
        1
      </button>
    );

    // Show dots or numbers
    if (currentPage > 3) {
      buttons.push(
        <button
          key={2}
          onClick={() => setCurrentPage(2)}
          className="px-3 py-1 rounded-lg bg-purple-100 text-purple-600"
        >
          2
        </button>
      );
      buttons.push(
        <span key="dots1" className="px-2">
          ...
        </span>
      );
    }

    // Current page and surrounding pages
    if (currentPage !== 1 && currentPage !== totalPages) {
      buttons.push(
        <button
          key={currentPage}
          onClick={() => setCurrentPage(currentPage)}
          className="px-3 py-1 rounded-lg bg-purple-600 text-white"
        >
          {currentPage}
        </button>
      );
    }

    // Show dots before last page
    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="dots2" className="px-2">
          ...
        </span>
      );
      buttons.push(
        <button
          key={totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
          className="px-3 py-1 rounded-lg bg-purple-100 text-purple-600"
        >
          {totalPages - 1}
        </button>
      );
    }

    // Always show last page
    if (totalPages !== 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-3 py-1 rounded-lg ${
            currentPage === totalPages
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

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
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="pl-6 pr-6 pb-6 pt-0  min-h-screen">
      {showAddStudent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddStudent(false);
            }
          }}
        >
          <div className="relative rounded-lg w-auto max-w-4xl p-4">
            <button
              onClick={() => setShowAddStudent(false)}
              className="absolute top-6 lg:top-4 right-2 p-2 bg-white rounded-full text-gray-600 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110 shadow-lg"
            >
              <X size={24} />
            </button>
            <AddStudents onClose={() => setShowAddStudent(false)} />
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2">All Students </h1>
          <div className="flex items-center text-sm ">
            <span className="mr-2">Students /</span>
            <span>All Students</span>
          </div>
        </div>
        <button
          onClick={() => setShowAddStudent(true)}
          className="flex items-center text-lg p-2 border-2 border-primaryBlue text-primaryBlue rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          <span>
            <Plus size={20} />
          </span>{" "}
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-2 rounded-md hadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 bg-white">
          <div className="relative flex-1 max-w-md text-gray-600 p-2 ml-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2  "
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            />
          </div>

          <div className="flex gap-4 mr-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="p-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            >
              <option value="">All Classes</option>
              <option value="Class 1A">Class 1A</option>
              <option value="Class 1B">Class 1B</option>
              <option value="Class 2A">Class 2A</option>
              <option value="Class 2B">Class 2B</option>
              <option value="Class 3A">Class 3A</option>
              <option value="Class 3B">Class 3B</option>
              <option value="Class 4A">Class 4A</option>
              <option value="Class 4B">Class 4B</option>
              <option value="Class 5A">Class 5A</option>
              <option value="Class 5B">Class 5B</option>
              <option value="Class 6A">Class 6A</option>
              <option value="Class 6B">Class 6B</option>
              <option value="Class 7A">Class 7A</option>
              <option value="Class 7B">Class 7B</option>
              <option value="Class 8A">Class 8A</option>
              <option value="Class 8B">Class 8B</option>
              <option value="Class 9A">Class 9A</option>
              <option value="Class 9B">Class 9B</option>
              <option value="Class 10A">Class 10A</option>
              <option value="Class 10B">Class 10B</option>{" "}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-black-300 text-base bg-white m-4">
          <table className="w-full min-w-[768px] pb-10">
            <thead className="">
              <tr className="border-b bg-lamaPurpleLight">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded h-4 w-4 bg-white border-gray-300 text-purpleColor checked:bg-purple-500 checked:border-transparent"
                  />
                </th>
                <th className="px-6 py-4 text-left ">Student's Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Parent Name</th>
                <th className="px-6 py-4 text-left">Parent Contact</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded h-4 w-4 bg-white checked:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-lamaPurpleLight rounded-full overflow-hidden flex flex-row justify-center items-center">
                        <GraduationCap size={20} />
                      </div>
                      <span className="">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">{student.email}</td>
                  <td className="px-6 py-4 text-left">
                    {student.studentClass?.className || "-"}
                  </td>
                  <td className="px-6 py-4 text-left">
                    {student.parentName || "-"}
                  </td>
                  <td className="px-6 py-4 text-left">
                    {student.parentContact || "-"}
                  </td>

                  <td className="px-6 py-4">
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

      {/* Pagination */}
      <div className="bottom-0 left-0 right-0 flex justify-center items-center py-4">
        <div className="flex items-center justify-center space-x-2">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

// Add custom animation class
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

export default StudentDetails;
