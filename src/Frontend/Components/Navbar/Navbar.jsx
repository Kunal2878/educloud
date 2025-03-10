import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../Store/slice";
import PerformanceDashboard from "../AttendanceSystem/Performance";
import ClassAttendanceTracker from "../AttendanceSystem/MarkAttendanceByClass";
import AttendanceSystem from "../AttendanceSystem/MarkAttendanceByClass2";
import { ProfilePage, TeacherDetails } from "../../Pages";
import StudentDetails from "../Classes/AllStudents";
// import TeacherDetails from "../../Pages/Teacher/AllTeacher";
import AssignClassSub from "../../Pages/Teacher/AssignClassSub";
import Events from "../../Pages/Events";
import RegisterClass from "../../Pages/Classes/RegisterClass";
import AddStudents from "../../Pages/Student/AddStudent";
import RegisterSubjects from "../../Pages/Subjects/RegisterSubject";
import AllSubjects from "../../Pages/Subjects/AllSubject";
import UploadTimeTable from "../../Pages/TimeTable/UploadTimeTable";
import AllExams from "../../Pages/Exam/AllExam";
import MyAttendance from "../../Pages/Student/MyAttendance";
import MyExams from "../../Pages/Student/MyExam";
import MyResults from "../../Pages/Student/MyResult";
import MySubjects from "../../Pages/Student/MySubject";
import MyStudents from "../../Pages/Teacher/MyStudent";
import AllClasses from "../../Pages/Classes/AllClass";
import PaymentMethodSelector from "../../Pages/Payment/PaymentMode";
import LeaderBoard from "../../Pages/Mark/LeaderBoard"; 
import UnderMaintenance from "../../Pages/UnderMaintence"; 
// import AddMark from "../../Pages/Mark/AddMark";  
 
import {
  Home,
  AlignLeft,
  User,
  Users,
  BookOpen,
  Calendar,
  ChevronDown,
  X,
  Award,
  FileText,
  Clock,
  School,
  GraduationCap,
  Pen,
  Trophy,
  LogOut,
  ChevronRight,
  IndianRupee,
  ShieldAlert,
} from "lucide-react";
import { educloud, onboarding } from "../../../assets";
// import { path } from 'framer-motion/client';

const themeColors = {
  admin: "bg-purpleColor",
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
    <nav className="w-full fixed top-0 flex justify-between items-center z-40 bg-accent-100 bg-opacity-10 backdrop-blur-md shadow-sm px-6 py-4">
      <div className="w-full flex flex-row  justify-between items-center">
        {/* Left side */}

        <div className="flex items-center space-x-3 gap-4">
          <button
            onClick={onMenuClick}
            className=" ml-6 rounded-md  transition-colors cursor-pointer"
          >
            <ChevronRight size={24} className="text-black" />
          </button>
        </div>

        {/* <div className="sidebar-user-info flex items-center gap-2">
          <img
            src={educloud}
            alt="avatar"
            width={44}
            height={44}
            className="sidebar-user-avatar"
          />

          <div className="hidden lg:block">
            <h2 className="h2 capitalize">Katlicherra Central School</h2>
          </div>
        </div> */}

        <div className="flex flex-row items-center space-x-4">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md cursor-ponter text-white font-semibold bg-brand flex items-center gap-2"
          >
            <span>
              <LogOut size={18} className="mr-1" />
            </span>
            Logout
          </button>
          <Link
            to="/profile"
            className="rounded-full size-8 flex items-center justify-center text-purpleColor border-2 border-purpleColor"
          >
            <span>
              <User size={24} />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, role, onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});
  useEffect(() => {
    setMenuOpen(isOpen);
  }, [isOpen]);
  const menuItems = {
    admin: [
      { icon: Home, label: "Home", id: "home", path: "/dashboard" },
      {
        icon: GraduationCap,
        label: "Students",
        id: "students",
        submenu: [
          { label: "All Students", id: "all-students", path: "/all-students" },
          { label: "Add Marks", id: "add-marks", path: "/add-marks" },
          { label: "ID Card", id: "id-card", path: "/id-card" },
        ],
      },
      {
        icon: Users,
        label: "Teachers",
        id: "teachers",
        submenu: [
          { label: "All Teachers", id: "all-teachers", path: "/all-teachers" },
          {
            label: "Attendance",
            id: "teacher-attendance",
            path: "/teacher-attendance",
          },
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
        submenu: [
          {
            label: "All Classes",
            id: "all-classes",
            path: "/all-classes",
          },
          {
            label: "Leaderboard",
            id: "leaderboard",
            path: "/leaderboard",
          },
          {
            label: "Attendance",
            id: "class-attendance",
            path: "/mark-attendance",
          },
        ],
      },
      {
        icon: BookOpen,
        label: "Subjects",
        id: "subjects",
        submenu: [
          { label: "All Subjects", id: "all-subjects", path: "/all-subjects" },
        ],
      },
      {
        icon: FileText,
        label: "Exam",
        id: "exam",
        submenu: [{ label: "All Exams", id: "all-exams", path: "/all-exams" }],
      },
      {
        icon: Clock,
        label: "Time table",
        id: "time-table",
        path: "/time-table",
      },
      {
        icon: ShieldAlert,
        label: "Complaints",
        id: "complaints",
        path: "/complaints",
      },
      { icon: Calendar, label: "Events", id: "events", path: "/events" },
      { icon: IndianRupee, label: "Finance", id: "finance", path: "/finance" },
    ],
    teacher: [
      { icon: Home, label: "Dashboard", id: "dashboard", path: "/dashboard" },
      {
        icon: Users,
        label: "My Students",
        id: "my-students",
        path: "/my-students",
      },
      {
        icon: Clock,
        label: "Time table",
        id: "time-table",
        path: "/time-table",
      },
      // { icon: Calendar, label: "Schedule", id: "schedule" },
      { icon: FileText, label: "Exams", id: "exams", path: "/all-exams" },
      { icon: Award, label: "Results", id: "results", path: "/results" },
    ],
    student: [
      { icon: Home, label: "Dashboard", id: "dashboard", path: "/dashboard" },
      // { icon: Calendar, label: "My Schedule", id: "schedule" },
      {
        icon: BookOpen,
        label: "My Subjects",
        id: "my-subjects",
        path: "/my-subjects",
      },
      {
        icon: Calendar,
        label: "My Attendance",
        id: "my-attendance",
        path: "/my-attendance",
      },
      {
        icon: Clock,
        label: "My Time-table",
        id: "my-time-table",
        path: "/my-time-table",
      },
      { icon: FileText, label: "My Exams", id: "my-exams", path: "/my-exams" },
      { icon: Award, label: "My Results", id: "results", path: "/my-results" },
    ],
  };

  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside
      className={`text-black
      fixed left-0 top-0 h-screen w-72 pb-14
      bg-white transform transition-transform duration-300 ease-in-out
      sidebar
      ${isOpen ? "translate-x-0 " : "-translate-x-full"}
      overflow-y-scroll
      z-50
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-slate-200
      [&::-webkit-scrollbar-thumb]:rounded-full
    `}
    >
      <div className="px-4 mt-4 flex items-center justify-between">
        <Link to="/" className="h3 font-medium text-black">
          <span className="text-purpleColor">Edu</span>Cloud
        </Link>

        <button onClick={onMenuClick}>
          <span>
            <X size={24} />
          </span>
        </button>
      </div>

      <nav className="sidebar-nav p-4">
        <ul className="flex flex-1 flex-col gap-6">
          {menuItems[
            role === "principal"
              ? "admin"
              : role === "teacher"
              ? "teacher"
              : "student"
          ].map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <button
                  onClick={() => toggleSubmenu(item.id)}
                  className={`
                  w-full flex items-center space-x-3 px-4 rounded-lg mb-1
                  transition-colors duration-200
                  ${
                    activeItem === item.id
                      ? "bg-purpleColor text-white"
                      : "text-black"
                  }
                  ${themeColors[role]?.hover}
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
                        ? "bg-purpleColor text-white"
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
                            ? "bg-purpleColor text-white"
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
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

// Main Layout Component
const Nav = ({ children, path }) => {
  const dispatch = useDispatch();
  const user =
    JSON.parse(Cookies.get("user" || "student" || "teacher")) || "{}";
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
      <Sidebar
        isOpen={sidebarOpen}
        role={user.role}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <NavBar User={User} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`w-full min-h-screen absolute top-0 mt-5`}>
        {path === "/dashboard" && <PerformanceDashboard />}
        {path === "/mark-attendance" && <AttendanceSystem />}
        {path === "/profile" && <ProfilePage />}
        {path === "/all-students" && <StudentDetails />}
        {path === "/all-teachers" && <TeacherDetails />}
        {path === "/assign-classes-subjects" && <AssignClassSub />}
        {path === "/events" && <Events />}
        {path === "/register-class" && <RegisterClass />}
        {path === "/add-students" && <AddStudents />}
        {path === "/add-teachers" && <AddTeachers />}
        {path === "/time-table" && <UploadTimeTable />}
        {path === "/all-exams" && <AllExams />}
        {path === "/my-attendance" && <MyAttendance />}
        {path === "/my-exams" && <UnderMaintenance />}
        {path === "/my-subjects" && <UnderMaintenance />}
        {path === "/my-results" && <UnderMaintenance />}
        {path === "/my-students" && <MyStudents />}
        {path === "/all-classes" && <AllClasses />}
        {path === "/payment-modes" && <PaymentMethodSelector />}
        {path === "/all-subjects" && <AllSubjects />}
        {path === "/leaderboard" && <LeaderBoard />}
        {path === "/add-marks" && <LeaderBoard />}
        {path === "/id-card" && <UnderMaintenance />}
        {path === "/teacher-attendance" && <UnderMaintenance />}
        {path === "/my-time-table" && <UnderMaintenance />}
        {path === "/finance" && <UnderMaintenance />}
        {path === "/complaints" && <UnderMaintenance />}
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
