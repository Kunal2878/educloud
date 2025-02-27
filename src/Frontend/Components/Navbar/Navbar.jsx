import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../Store/slice";
import PerformanceDashboard from "../AttendanceSystem/Performance";
import ClassAttendanceTracker from "../AttendanceSystem/MarkAttendanceByClass";
import ProfilePage from "../../Pages/AboutMe";
import StudentDetails from "../Classes/AllStudents";
import TeacherDetails from "../../Pages/Teacher/AllTeacher";
import AssignClassSub from "../../Pages/Teacher/AssignClassSub";
import Events from "../../Pages/Events";
import RegisterClass from "../../Pages/Classes/RegisterClass";
import AddStudents from '../../Pages/Student/AddStudent'
// import AddTeachers from '../../Pages/Teacher/AddTeacher'
import RegisterSubjects from '../../Pages/Subjects/RegisterSubject'
import UploadTimeTable from '../../Pages/TimeTable/UploadTimeTable'
import CreateExam from '../../Pages/Exam/CreateExam'
import MyAttendance from '../../Pages/Student/MyAttendance'
import MyExams from '../../Pages/Student/MyExam'
import MyResults from '../../Pages/Student/MyResult'
import MySubjects from '../../Pages/Student/MySubject'
import MyStudents from '../../Pages/Teacher/MyStudent'

import {
  Home,
  AlignLeft,
  User,
  Users,
  BookOpen,
  Calendar,
  Settings,
  ChevronDown,
  Menu,
  X,
  Award,
  Bell,
  FileText,
  Truck,
  Clock,
  School,
  GraduationCap,
  Pen,
  LogOut,
} from "lucide-react";
// import { path } from 'framer-motion/client';

const themeColors = {
  admin: "bg-purple-400",
  //   teacher: 'bg-purple-600',
  //   student: 'bg-green-600'
};

const NavBar = ({ User, onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/user-options";
  };

  return (
    <nav className="w-full  shadow-lg fixed flex flex-row top-0 z-50 bg-slate-200 pr-4 p-2">
      <div className="w-full flex flex-row  justify-between items-center">
        {/* Left side */}

        <div className="flex items-center space-x-3 gap-4">
          <button
            onClick={onMenuClick}
            className=" ml-6 rounded-md  transition-colors cursor-pointer"
          >
            <AlignLeft size={24} className="text-purple-500" />
          </button>
          <span className="text-xl font-bold text-black">
            <span className="text-purple-500">Edu</span>Cloud
          </span>
        </div>

        <div className="flex flex-row items-center space-x-4">
          <button
            onClick={handleSignOut}
            className="p-1 w-24 rounded-md transition-colors cursor-ponter text-danger border-2 border-danger flex flex-row justify-center items-center "
          >
            <LogOut size={12} className="text-danger text-xs mr-1 " />{" "}
            <span>Logout</span>
          </button>
          <Link
            to="/profile"
            className="rounded-full size-8 text-purple-500 border-2 border-purple-500"
          >
            <span>👤</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, role }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});
  useEffect(() => {
    setMenuOpen(isOpen);
  }, [isOpen]);
  const menuItems = {
    admin: [
      { icon: Home, label: "Dashboard", id: "dashboard" },
      {
        icon: Users,
        label: "Students",
        id: "students",
        submenu: [
          { label: "All Students", id: "all-students", path: "/all-students" },
          { label: "Add Student", id: "add-student", path: "/add-students" },
          { label: "Attendance", id: "attendance", path: "/mark-attendance" },
        ],
      },
      {
        icon: Pen,
        label: "Teachers",
        id: "teachers",
        submenu: [
          { label: "All Teachers", id: "all-teachers", path: "/all-teachers" },
          { label: "Add-teachers", id: "add-teachers", path: "/add-teachers" },
          {
            label: "Assign classes/Subjects",
            id: "assign-classes-subjects",
            path: "/assign-classes-subjects",
          },
        ],
      },
      {
        icon: School,
        label: "Classes",
        id: "classes",
        path: "/register-class",
      },
      { icon: BookOpen, label: "Subjects", id: "subjects", path: "/register-subjects" },
      { icon: FileText, label: "Exam", id: "exam", 
        submenu:[
          { label: "Create Exam", id: "create-exam", path: "/create-exams"}
        ]
      },
      {
        icon: Clock,
        label: "Time table",
        id: "time-table",
        path: "/time-table",
      },
      { icon: Calendar, label: "Events", id: "events", path: "/events" },
    ],
    teacher: [
      { icon: Home, label: "Dashboard", id: "dashboard",path:'/dashboard' },
      { icon: Users, label: "My Students", id: "my-students",path:'/my-students' },
      {
        icon: Clock,label: "Time table", id: "time-table", path: "/time-table",
      },
      // { icon: Calendar, label: "Schedule", id: "schedule" },
      { icon: FileText, label: "Exams", id: "exams", path:'/create-exams' },
      { icon: Award, label: "Results", id: "results",path:'/results' },
    ],
    student: [
      { icon: Home, label: "Dashboard", id: "dashboard",path:'/dashboard' },
      // { icon: Calendar, label: "My Schedule", id: "schedule" },
     { icon: BookOpen, label: "My Subjects", id: "my-subjects", path:'/my-subjects' },
      { icon: Calendar, label: "My Attendance", id: "my-attendance", path:'/my-attendance' },
      { icon: Clock, label: "My Time-table", id: "my-time-table", path:'/my-time-table' },
      { icon: FileText, label: "My Exams", id: "my-exams", path:'/my-exams' },
      { icon: Award, label: "My Results", id: "results", path:'/my-results' },    ],
  };

  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`text-black
      fixed left-0 top-14 h-screen w-64 shadow-lg 
      bg-gray-50 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0 " : "-translate-x-full"}
      overflow-y-auto
      z-40
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-slate-200
      [&::-webkit-scrollbar-thumb]:rounded-full
    `}
    >
      <div className="p-4">
        {menuItems[role === 'principal' ? 'admin' : role === 'teacher' ? 'teacher' : 'student'].map((item) => (
          <div key={item.id}>
            {item.submenu ? (
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1
                  transition-colors duration-200
                  ${
                    activeItem === item.id
                      ? role && themeColors[role]?.active
                      : "text-black"
                  }                  ${themeColors[role]?.hover}
                `}
              >
                <item.icon size={20} />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-200 
                    ${expandedMenus[item.id] ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <Link to={item.path || "/"}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1
                    transition-colors duration-200
                    ${
                      activeItem === item.id
                        ? themeColors[role]?.active
                        : "text-black"
                    }
                    ${themeColors[role]?.hover}
                  `}
                >
                  <item.icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              </Link>
            )}

            {/* Submenu */}
            {item.submenu && (
              <div
                className={`
                pl-12 space-y-1
                transform transition-all duration-200 ease-in-out
                ${
                  expandedMenus[item.id]
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }
              `}
              >
                {item.submenu.map((subItem) => (
                  <Link key={subItem.id} to={subItem.path}>
                    <button
                      onClick={() => setActiveItem(subItem.id)}
                      className={`
                        w-full text-left py-2 px-4 rounded-lg
                        transition-colors duration-200
                        ${
                          activeItem === subItem.id
                            ? "text-purple-500"
                            : "text-black"
                        }
                        ${themeColors[role]?.hover}
                      `}
                    >
                      {subItem.label}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>  );
};

// Main Layout Component
const Nav = ({ children, path }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(Cookies.get("user"||"student"||"teacher")) || "{}";
  if (user !== null || user !== undefined) {
    dispatch(setUser(user));
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState("admin");
  const name = useSelector((state) => state.userData.name);
  const email = useSelector((state) => state.userData.email);
  const role = useSelector((state) => state.userData.role);

  return (
    <div className="w-full flex flex-col">
      <NavBar User={User} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} role={user.role} />
      <div className="w-full min-h-screen absolute top-0 mt-20">
        {path === "/dashboard" && <PerformanceDashboard />}
        {path === "/mark-attendance" && <ClassAttendanceTracker />}
        {path === "/profile" && <ProfilePage />}
        {path === "/all-students" && <StudentDetails />}
        {path === "/all-teachers" && <TeacherDetails />}
        {path === "/assign-classes-subjects" && <AssignClassSub />}
        {path === "/events" && <Events />}
        {path === "/register-class" && <RegisterClass />}
        {path === "/add-students" && <AddStudents />}
        {path === "/add-teachers" && <AddTeachers />}
        {path === "/register-subjects" && <RegisterSubjects />}
        {path === "/time-table" && <UploadTimeTable />}
        {path === "/create-exams" && <CreateExam />}
        {path === "/my-attendance" && <MyAttendance />}
        {path === "/my-exams" && <MyExams/>}
        {path === "/my-subjects" && <MySubjects />}
        {path === "/my-results" && <MyResults />}
        {path === "/my-students" && <MyStudents />}
      </div>

      <main
        className={`
        pt-16 lg:pl-64
        transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-0"}
        lg:ml-0
      `}
      >
        {children}
      </main>
    </div>
  );
};

export default Nav;
