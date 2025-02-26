import React, { useState, useEffect } from "react";
import { Search, Loader,Trash2, PenSquare, GraduationCap, Plus } from "lucide-react";
import {Link} from "react-router-dom"
const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState("Last 30 days");
  const studentsPerPage = 10;

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

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

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
    <div className="p-6 bg-white min-h-screen mt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2">All Students </h1>
          <div className="flex items-center text-sm ">
            <span className="mr-2">Home /</span>
            <span>Students</span>
          </div>
        </div>
        <Link to='/add-students' className="p-2 border-2  border-primaryBlue text-sm text-primaryBlue rounded-full  transition-colors duration-200 transform hover:scale-105">
          <span>
            <Plus size={24} />
          </span>{" "}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md bg-slate-200 text-gray-600">
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

        <div className="flex gap-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
          >
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-black-300 text-xs">
        <table className="w-full min-w-[768px] pb-10">
          <thead className="bg-white">
            <tr className="border-b">
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  className="rounded bg-white border-gray-300 text-purple-500 checked:bg-purple-500 checked:border-transparent"
                />
              </th>              <th className="px-6 py-4 text-left">Student's Name</th>              <th className="px-6 py-4 text-center">Class</th>              <th className="px-6 py-4 text-center">Parent Name</th>
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
                      {/* <img
                        src="/api/placeholder/32/32"
                        alt={student.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
                      /> */}
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
                <td className="px-6 py-4 text-center">-</td>
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

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstStudent + 1} to{" "}
            {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
            {filteredStudents.length} entries
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded transition-all duration-200 transform hover:scale-105 ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
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
