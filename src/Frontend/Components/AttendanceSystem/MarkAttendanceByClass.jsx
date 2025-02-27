import React, { useState, useEffect } from "react";
import { Search, Check, X, Plus, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import AddStudents from '../../Pages/Student/AddStudent'

const ClassAttendanceTracker = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Michelle Johnson", class: "Class 1A" },
  
    { id: 2, name: "Courtney Henry", class: "Class 1B" },
    { id: 3, name: "Jacob Jones", class: "Class 2A" },
    { id: 4, name: "Robert Fox", class: "Class 2B" },
    { id: 5, name: "Cody Fisher", class: "Class 3A" },
    { id: 6, name: "Arlene McCoy", class: "Class 3B" },
    { id: 7, name: "Jerome Bell", class: "Class 4A" },
    { id: 8, name: "Theresa Webb", class: "Class 4B" },
    { id: 9, name: "Dianne Russell", class: "Class 5A" },
    { id: 10, name: "Eleanor Pena", class: "Class 5B" },
    { id: 11, name: "Arlene McCoy", class: "Class 6A" },
    { id: 12, name: "Jerome Bell", class: "Class 6B" },
    { id: 13, name: "Theresa Webb", class: "Class 7A" },
    { id: 14, name: "Dianne Russell", class: "Class 7B" },
    { id: 15, name: "Eleanor Pena", class: "Class 8A" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Class 1A");
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const studentsPerPage = 10;

  // Initialize attendance data
  useEffect(() => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        attendance: Array(31)
          .fill(null)
          .map(() => (Math.random() > 0.5 ? "present" : "absent")),
      }))
    );
  }, []);

  const getDaysInRange = () => {
    return Array.from({ length: 14 }, (_, i) => i + 15);
  };

  const isHoliday = (day) => {
    const date = new Date(2024, 1, day);
    return date.getDay() === 0;
  };

  const toggleAttendance = (studentId, day, status) => {
    if (isHoliday(day)) return;

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          const newAttendance = [...student.attendance];
          newAttendance[day - 1] = status;
          return { ...student, attendance: newAttendance };
        }
        return student;
      })
    );
  };

  const [daysInMonth, setDaysInMonth] = useState(31);
  const [selectedMonth, setSelectedMonth] = useState({ year: 2024, month: 1 });

  // Filter students based on search query and selected class
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Generate class options
  const classOptions = Array.from({ length: 10 }, (_, i) => {
    const classNum = i + 1;
    return [
      `Class ${classNum}A`,
      `Class ${classNum}B`
    ];
  }).flat();

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const renderPaginationButtons = () => {
    const buttons = [];
    
    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
          currentPage === 1 ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
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
      buttons.push(<span key="dots1" className="px-2">...</span>);
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
      buttons.push(<span key="dots2" className="px-2">...</span>);
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
            currentPage === totalPages ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg bg-purple-100 text-purple-600 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    );

    return buttons;
  };

  return (
    <div className="pl-6 pr-6 pb-6 pt-0  min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Mark Attendance </h1>
          <div className="flex items-center text-sm">
            <span className="mr-2">Students /</span>
            <span>Attendance</span>
          </div>
        </div>
        <button onClick={() => setShowAddStudents(true)} className="p-2 border-2 border-primaryBlue text-sm text-primaryBlue rounded-full transition-colors duration-200 transform hover:scale-105">
          <span>
            <Plus size={24} />
          </span>
        </button>
      </div>

      {showAddStudents && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddStudents(false);
          }
        }}>
          <div className="relative rounded-lg w-auto max-w-4xl p-4">
            <button
              onClick={() => setShowAddStudents(false)}
              className="absolute top-6 lg:top-4 right-2 p-2 bg-white rounded-full text-gray-600 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110 shadow-md"
            >
              <X size={24} />
            </button>
            <AddStudents onClose={() => setShowAddStudents(false)} />
          </div>
        </div>
      )}


<div className="bg-white p-4 rounded-lg shadow-lg">

         
      {/* Class Selection, Search and Calendar */}
      <div className="flex flex-row  items-center justify-between gap-4 mb-4">
        <div className="relative flex-1 max-w-md  bg-slate-100 rounded-md text-gray-600">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={20}
          />
          <input
            type="text"
            placeholder="Search student by name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg  focus:outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
        <select
          className="p-2 rounded-lg text-xs outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="all">All Classes</option>
          {classOptions.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
        <input
          type="month"
          className="p-2 rounded-lg text-xs  outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
          defaultValue="2024-02"
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            const daysInMonth = new Date(year, month, 0).getDate();
            setDaysInMonth(daysInMonth);
            setSelectedMonth({
              year: parseInt(year),
              month: parseInt(month) - 1,
            });
          }}
        />
  
        </div>
        </div>

      {/* Attendance Table */}
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 #EDF2F7" }}
      >
        <table className="w-full border-collapse min-w-[768px] text-xs bg-white">
          <thead className=" border-2 border-purple-50 bg-purple-100">
            <tr className="">
              <th className="px-6 py-4 text-left w-64 text-gray-500 sticky left-0 bg-purple-100 whitespace-nowrap z-20">
                Student's Name
              </th>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => (
                  <th
                    key={day}
                    className="px-6 py-4 text-center w-12  text-gray-500"
                  >
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredStudents
              .slice(
                (currentPage - 1) * studentsPerPage,
                currentPage * studentsPerPage
              )
              .map((student) => (
                <tr key={student.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-500 w-64 sticky left-0 bg-white whitespace-nowrap z-20">
                    {student.name}
                  </td>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => {
                      const date = new Date(
                        selectedMonth.year,
                        selectedMonth.month,
                        day
                      );
                      const isSunday = date.getDay() === 0;
                      return (
                        <td
                          key={day}
                          className="px-6 py-4 text-center relative group"
                        >
                          {isSunday ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <div className="relative">
                              <div
                                className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-white
                            ${
                              student.attendance &&
                              student.attendance[day - 1] === "present"
                                ? " bg-green-500"
                                : "bg-red-500"
                            }`}
                              >
                                {student.attendance &&
                                student.attendance[day - 1] === "present" ? (
                                  <Check size={16} />
                                ) : (
                                  <X size={16} />
                                )}
                              </div>

                              <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-white shadow-lg rounded-lg p-1 z-10">
                                <button
                                  onClick={() =>
                                    toggleAttendance(student.id, day, "present")
                                  }
                                  className="p-1 hover:bg-green-100 rounded"
                                >
                                  <Check size={16} className="text-green-500" />
                                </button>
                                <button
                                  onClick={() =>
                                    toggleAttendance(student.id, day, "absent")
                                  }
                                  className="p-1 hover:bg-red-100 rounded"
                                >
                                  <X size={16} className="text-red-500" />
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {renderPaginationButtons()}
      </div>
      </div>
    
  );};

export default ClassAttendanceTracker;