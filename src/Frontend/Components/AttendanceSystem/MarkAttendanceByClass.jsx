import React, { useState, useEffect } from "react";
import { Search, Check, X,Plus, Loader } from "lucide-react";
import AddStudents from '../../Pages/Student/AddStudent'

const ClassAttendanceTracker = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Michelle Johnson" },
    { id: 2, name: "Courtney Henry" },
    { id: 3, name: "Jacob Jones" },
    { id: 4, name: "Robert Fox" },
    { id: 5, name: "Cody Fisher" },
    { id: 6, name: "Arlene McCoy" },
    { id: 7, name: "Jerome Bell" },
    { id: 8, name: "Theresa Webb" },
    { id: 9, name: "Dianne Russell" },
    { id: 10, name: "Eleanor Pena" },
    { id: 11, name: "Arlene McCoy" },
    { id: 12, name: "Jerome Bell" },
    { id: 13, name: "Theresa Webb" },
    { id: 14, name: "Dianne Russell" },
    { id: 15, name: "Eleanor Pena" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Class One (Section A)");
  const [showAddStudents, setShowAddStudents] = useState(false);
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
    const date = new Date(2024, 1, day); // February 2024
    return date.getDay() === 0; // Sunday
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

  const [daysInMonth, setDaysInMonth] = useState(31); // Add this state
  const [selectedMonth, setSelectedMonth] = useState({ year: 2024, month: 1 }); // Add this state

  return (
    <div className="pl-6 pr-6 pb-6 pt-0  min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md bg-slate-100 rounded-md text-gray-600">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              size={20}
            />
            <input
              type="text"
              placeholder="What do you want to find?"
              className="w-full pl-10 pr-4 py-2   rounded-lg focus:outline-none bg-primary-300 text-black-300 border-lamaSkyLight "
            />
          </div>
          <button onClick={() => setShowAddStudents(true)} className="p-2 border-2  border-primaryBlue text-sm text-primaryBlue rounded-full  transition-colors duration-200 transform hover:scale-105">
          <span>
            <Plus size={24} />
          </span>{" "}
        </button>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">Students /</span>
          <span>Attendance</span>
        </div>
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


      
      {/* Class Selection and Calendar */}
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-4">
          <select
            className="p-2   rounded-lg text-xs text-gray-600 bg-slate-100"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="Class One (Section A)">Class One (Section A)</option>
            <option value="Class One (Section B)">Class One (Section B)</option>
            <option value="Class Two (Section A)">Class Two (Section A)</option>
            <option value="Class Two (Section B)">Class Two (Section B)</option>
            <option value="Class Three (Section A)">
              Class Three (Section A)
            </option>
            <option value="Class Three (Section B)">
              Class Three (Section B)
            </option>
          </select>

          <input
            type="month"
            className="p-2  rounded-lg text-xs text-gray-600 bg-slate-100"
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
            {students
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(students.length / studentsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(students.length / studentsPerPage)
          }
          className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassAttendanceTracker;