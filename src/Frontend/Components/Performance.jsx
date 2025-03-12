import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Pen,
  TrendingUp,
  Calendar,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Store/slice";

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Days of week headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Select a date
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // Check if a date is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Generate calendar days
  const renderDays = () => {
    const days = [];

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8 text-primaryBlue"></div>
      );
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`size-6 mb-1 shadow-lg text-gray-600 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isToday(day) ? "border border-blue-400 font-bold" : ""}
            ${
              isSelected(day) ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="rounded-lg p-4">
      {/* Header with month/year and navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>

        <div className="font-medium text-center text-gray-500">
          <div className=" text-xs">Month/Year</div>
          <div>
            {months[currentMonth]} {currentYear}
          </div>
        </div>

        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs text-primaryBlue">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

const PerformanceDashboard = () => {
  const user = useSelector((state) => state.userData.user);

  const StudentData = [
    { name: "Performance", value: "85%", Icon: TrendingUp },
    { name: "Days present", value: 2, Icon: Calendar },
    { name: "feedback", value: "Excellent", Icon: GraduationCap },
  ];
  const TeachData = [
    { name: "Performance", value: "95%", Icon: TrendingUp },
    { name: "Leave records", value: "2 Days", Icon: Calendar },
    { name: "feedback", value: "Excellent", Icon: GraduationCap },
  ];
  const PrincipalData = [
    { name: "Students", value: 20, Icon: GraduationCap },
    { name: "Teachers", value: 100, Icon: Pen },
    { name: "Earnings", value: "1200000", Icon: IndianRupee },
  ];
  const [selectedClass, setSelectedClass] = useState("Class A");
  const [selectedDate, setSelectedDate] = useState("2024-05-05");
  const [isLoading, setIsLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false);

  const attendanceData = [
    { day: "1", totalPresent: 8, totalAbsent: 2 },
    { day: "2", totalPresent: 8, totalAbsent: 2 },
    { day: "3", totalPresent: 2, totalAbsent: 4 },
    { day: "4", totalPresent: 4, totalAbsent: 7 },
    { day: "5", totalPresent: 6, totalAbsent: 6 },
    { day: "6", totalPresent: 5, totalAbsent: 5 },
    { day: "7", totalPresent: 3, totalAbsent: 3 },
    { day: "8", totalPresent: 2, totalAbsent: 4 },
  ];

  const studentAttendanceData = [
    { day: "1", attendance: 90, performance: 85 },
    { day: "2", attendance: 95, performance: 88 },
    { day: "3", attendance: 85, performance: 82 },
    { day: "4", attendance: 92, performance: 87 },
    { day: "5", attendance: 88, performance: 84 },
    { day: "6", attendance: 91, performance: 86 },
    { day: "7", attendance: 87, performance: 83 },
    { day: "8", attendance: 93, performance: 89 },
  ];

  const teacherData = [
    { day: "1", classPerformance: 88, attendance: 95 },
    { day: "2", classPerformance: 92, attendance: 98 },
    { day: "3", classPerformance: 85, attendance: 90 },
    { day: "4", classPerformance: 90, attendance: 92 },
    { day: "5", classPerformance: 87, attendance: 94 },
    { day: "6", classPerformance: 91, attendance: 96 },
    { day: "7", classPerformance: 86, attendance: 91 },
    { day: "8", classPerformance: 89, attendance: 93 },
  ];

  const MALE_COLOR = "#8B31FF";
  const FEMALE_COLOR = "#FF9839";
  const MALE_FADED = "#E9DFFF";
  const FEMALE_FADED = "#FFE9D5";

  const pieData =
    user.role === "principal"
      ? [
          { name: "Male Active", value: 55 },
          { name: "Male Inactive", value: 45 },
        ]
      : user.role === "teacher"
      ? [
          { name: "Present", value: 85 },
          { name: "Absent", value: 15 },
        ]
      : [
          { name: "Completed", value: 75 },
          { name: "Pending", value: 25 },
        ];

  const financialData = [
    { year: "2020", revenue: 1200000, expenses: 800000 },
    { year: "2021", revenue: 1500000, expenses: 1000000 },
    { year: "2022", revenue: 1800000, expenses: 1200000 },
    { year: "2023", revenue: 2100000, expenses: 1400000 },
    { year: "2024", revenue: 2300000, expenses: 1600000 },
  ];

  const classes = ["Class A", "Class B", "Class C", "Class D"];

  useEffect(() => {
    setIsLoading(true);
    setShowCharts(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowCharts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedClass, selectedDate]);

  const getChartData = () => {
    switch (user.role) {
      case "student":
        return studentAttendanceData;
      case "teacher":
        return teacherData;
      default:
        return attendanceData;
    }
  };

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10">
      <div className="mb-4 text-left">
        <p className="flex flex-col gap-2 sm:text-3xl text-xl capitalize font-medium text-black">
          <h1 className="h1">
            Welcome <span className="waving-hand">👋</span>,
            <span className="text-primaryBlue"> {user.name}</span>
          </h1>
          <span className="h2 text-black-300">
            Your success is our priority!
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full  p-4 ">
        {(user.role === "principal"
          ? PrincipalData
          : user.role === "teacher"
          ? TeachData
          : StudentData
        ).map((card, index) => (
          <div
            key={card.name}
            className={`p-4 rounded-md flex items-center justify-between transform transition-all duration-500 ease-out overflow-hidden ${
              index === 0
                ? "bg-lamaPurpleLight"
                : index === 1
                ? "bg-lamaSkyLight"
                : "bg-success-100"
            }`}
            style={{
              opacity: showCharts ? 1 : 0,
              transform: `translateY(${showCharts ? 0 : "20px"})`,
              transitionDelay: `${index * 100}ms`,
              minWidth: 0,
            }}
          >
            <div className="min-w-0">
              <p className="text-gray-500 truncate">{card.name}</p>
              <p className="text-2xl font-bold text-black truncate">
                {card.value}
              </p>
            </div>
            <card.Icon
              className={`w-8 h-8 flex-shrink-0 ${
                index === 0
                  ? "text-purpleColor"
                  : index === 1
                  ? "text-primaryBlue"
                  : "text-green-500"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div
          className="bg-whie p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : "20px"})`,
            transitionDelay: "400ms",
          }}
        >
          <h2 className="text-xl  font-medium mb-4 text-left">
            {user.role === "principal"
              ? "Student Ratio"
              : user.role === "teacher"
              ? "Attendance Distribution"
              : "Task Completion"}
          </h2>
          <div className="relative w-64 h-64 mx-auto">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={65}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell key="active" fill={MALE_COLOR} strokeWidth={0} />
                    <Cell key="inactive" fill={MALE_FADED} strokeWidth={0} />
                  </Pie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell key="active" fill={FEMALE_COLOR} strokeWidth={0} />
                    <Cell key="inactive" fill={FEMALE_FADED} strokeWidth={0} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="flex flex-row space-x-4 jsutify-center items-center">
                <img className="w-16 h-20" src="/f_m.png" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 mb-2">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: MALE_COLOR }}
                ></div>
                <span className="text-sm " style={{ color: MALE_COLOR }}>
                  Male
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: FEMALE_COLOR }}
                ></div>
                <span className="text-sm" style={{ color: FEMALE_COLOR }}>
                  Female
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : "20px"})`,
            transitionDelay: "300ms",
          }}
        >
          <h2 className="text-xl font-medium mb-4 text-primaryBlue text-left">
            Calendar
          </h2>
          <div className="h-72">
            <CustomCalendar />
          </div>
        </div>
      </div>

      {user.role === "principal" && (
        <div
          className="mt-12 bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : "20px"})`,
            transitionDelay: "500ms",
          }}
        >
          <h2 className="text-xl font-medium mb-4">
            Financial Overview (5 Years)
          </h2>
          <div className="h-80">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Bar
                    dataKey="revenue"
                    fill="#0286FF"
                    name="Revenue"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#F75555"
                    name="Expenses"
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;
