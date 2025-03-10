import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Save, CheckCircle, XCircle } from "lucide-react";
import { GetAllClass } from "../../Route";
const AttendanceSystem = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
      fetchAttendance(selectedClass, selectedDate);
    }
  }, [selectedClass, selectedDate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/v1/${GetAllClass}`);
      setClasses(response.data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setMessage("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://school-backend-ocze.onrender.com/api/v1/student/getstudentbyclassid/${classId}`
      );
      setStudents(response.data.data.students);

      const initialAttendance = response.data.data.students.map((student) => ({
        student: student._id,
        status: "present",
      }));

      setAttendanceData(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async (classId, date) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/v1/student-attendance/classes/${classId}/attendance/${date}`
      );

      if (response.data.attendance && response.data.attendance.students) {
        const mappedAttendance = response.data.attendance.students.map(
          (item) => ({
            student: item.student._id,
            status: item.status,
          })
        );

        setAttendanceData(mappedAttendance);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.student === studentId
      );

      if (existingIndex !== -1) {
        const newData = [...prevData];
        newData[existingIndex] = { ...newData[existingIndex], status };
        return newData;
      } else {
        return [...prevData, { student: studentId, status }];
      }
    });
  };

  const setAllStudentsStatus = (status) => {
    const newData = students.map((student) => ({
      student: student._id,
      status,
    }));
    setAttendanceData(newData);
  };

  const saveAttendance = async () => {
    if (!selectedClass || !selectedDate) {
      setMessage("Please select a class and date");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        date: selectedDate,
        students: attendanceData,
      };
      console.log(attendanceData);
      await axios.post(
        `${url}/api/v1/student-attendance/classes/${selectedClass}/attendance`,
        payload
      );

      setMessage("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
      setMessage("Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStatus = (studentId) => {
    const studentAttendance = attendanceData.find(
      (item) => item.student === studentId
    );
    return studentAttendance ? studentAttendance.status : "present";
  };

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 text-2xl font-semibold mb-2">Mark Attendance</h2>
          <div className="flex items-center text-sm subtitle-2">
            <span className="mr-2">Students /</span>
            <span>Attendance</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 rounded-lg text-xs outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className} {cls.section ? `- ${cls.section}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-2 rounded-lg text-xs outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
                value={selectedDate}
                onChange={handleDateChange}
                onClick={(e) => e.target.showPicker()}
              />
              <Calendar
                className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>

        {selectedClass && (
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-4">Student List</h2>

            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium text-black-300">
                Set attendance for all students as:
              </span>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="bulkAttendance"
                    onChange={() => setAllStudentsStatus("present")}
                    className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-success-500 checked:border-success-500"
                  />
                  <span className="text-success-500">Present</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="bulkAttendance"
                    onChange={() => setAllStudentsStatus("absent")}
                    className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-red-500 checked:border-red-500"
                  />
                  <span className="text-danger">Absent</span>
                </label>
              </div>
            </div>

            <div className="overflow-x-auto text-black-300 text-base bg-white m-4">
              <table className="w-full min-w-[768px] pb-10">
                <thead className="">
                  <tr className="border-b bg-lamaPurpleLight">
                    <th className="px-6 py-4 text-left">#</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Roll Number</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-left">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr
                        key={student._id}
                        className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                      >
                        <td className="px-6 py-4 text-left">{index + 1}</td>
                        <td className="px-6 py-4 text-left">
                          {student.email || "-"}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {student.rollNumber || "-"}
                        </td>
                        <td className="px-6 py-4 text-left">{student.name}</td>
                        <td className="px-6 py-4 text-left">
                          <div className="flex gap-4">
                            <label
                              className={`flex items-center gap-1 cursor-pointer ${
                                getAttendanceStatus(student._id) === "present"
                                  ? "bg-success-100 p-2 rounded-md"
                                  : ""
                              }`}
                            >
                              <input
                                type="radio"
                                name={`attendance-${student._id}`}
                                checked={
                                  getAttendanceStatus(student._id) === "present"
                                }
                                onChange={() =>
                                  handleAttendanceChange(student._id, "present")
                                }
                                className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-success-500 checked:border-success-500"
                              />
                              <CheckCircle
                                size={18}
                                className="text-success-400"
                              />
                              <span>Present</span>
                            </label>

                            <label
                              className={`flex items-center gap-1 cursor-pointer ${
                                getAttendanceStatus(student._id) === "absent"
                                  ? "bg-red-100 p-2 rounded-md"
                                  : ""
                              }`}
                            >
                              <input
                                type="radio"
                                name={`attendance-${student._id}`}
                                checked={
                                  getAttendanceStatus(student._id) === "absent"
                                }
                                onChange={() =>
                                  handleAttendanceChange(student._id, "absent")
                                }
                                className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-red-500 checked:border-red-500"
                              />
                              <XCircle size={18} className="text-red-500" />
                              <span>Absent</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={saveAttendance}
                disabled={loading}
              >
                <Save size={18} />
                <span>Save Attendance</span>
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 p-2 rounded-md ${
                  message.includes("success")
                    ? "bg-success-100 text-success-500"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSystem;
