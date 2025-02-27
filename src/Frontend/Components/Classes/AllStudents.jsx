import React, { useState, useEffect } from "react";
import { Search, Loader,Trash2, PenSquare, GraduationCap, Plus, ArrowLeft, ArrowRight, X } from "lucide-react";
import AddStudents from '../../Pages/Student/AddStudent'
import {Link} from "react-router-dom"
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
    const nameMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const classMatch = timeFilter === "" || (student.studentClass?.className === timeFilter);
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
    const maxButtons = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxButtons) {
      const leftOffset = Math.floor(maxButtons / 2);
      const rightOffset = maxButtons - leftOffset - 1;

      if (currentPage <= leftOffset) {
        endPage = maxButtons;
      } else if (currentPage >= totalPages - rightOffset) {
        startPage = totalPages - maxButtons + 1;
      } else {
        startPage = currentPage - leftOffset;
        endPage = currentPage + rightOffset;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === i
              ? "bg-purple-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      buttons.unshift(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
      buttons.unshift(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-100 hover:bg-gray-200"
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-100 hover:bg-gray-200"
        >
          {totalPages}
        </button>
      );
    }

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
    )
  }

  return (
    <div className="pl-6 pr-6 pb-6 pt-0  min-h-screen">
      {showAddStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddStudent(false);
          }
        }}>
          <div className="relative rounded-lg w-auto max-w-4xl p-4">
            <button 
              onClick={() => setShowAddStudent(false)}

              className="absolute top-6 lg:top-4 right-2 p-2 bg-white rounded-full text-gray-600 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110 shadow-md"
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
          className="p-2 border-2 border-primaryBlue text-sm text-primaryBlue rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span>
            <Plus size={24} />
          </span>
        </button>
      </div>

      {/* Filters */}
<div className="bg-white p-2">
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
            <option value="Class 10B">Class 10B</option>          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-black-300 text-xs bg-white m-4">
        <table className="w-full min-w-[768px] pb-10">
          <thead className="">
            <tr className="border-b bg-purple-50">
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  className="rounded bg-white border-gray-300 text-purple-500 checked:bg-purple-500 checked:border-transparent"
                />
              </th>
              <th className="px-6 py-4 text-left">Student's Name</th>              
              <th className="px-6 py-4 text-center">Email</th>              
              <th className="px-6 py-4 text-center">Class</th>              
              <th className="px-6 py-4 text-center">Parent Name</th>
              <th className="px-6 py-4 text-center">Parent Contact</th>
              <th className="px-6 py-4 text-center">Action</th>
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
                    className="rounded bg-white checked:bg-purple-500 checked:border-transparent"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex flex-row justify-center items-center">
                      <GraduationCap size={20} />
                    </div>
                    <span className="hover:text-purple-500 transition-colors duration-200">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{student.email}</td>
                <td className="px-6 py-4 text-center">
                  {student.studentClass?.className || "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  {student.parentName || "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  {student.parentContact || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-1 hover:text-red-500 transition-colors duration-200 transform hover:scale-110">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1 hover:text-purple-500 transition-colors duration-200 transform hover:scale-110">
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
      <div className=" bottom-0 left-0 right-0 flex justify-center items-center py-2  shadow-lg">
        <div className=" w-1/2 flex items-center justify-center space-x-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white hover:bg-gray-200 disabled:opacity-50 "
          >
            <ArrowLeft size={20} className="text-black"/>
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-white hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowRight size={20} className="text-black"/>
          </button>
        </div>
      </div>

</div>
)

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