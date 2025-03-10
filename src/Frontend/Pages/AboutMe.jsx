import React from "react";
import {
  Phone,
  Mail,
  Home,
  Briefcase,
  User,
  Calendar,
  MapPin,
  Hash,
  GraduationCap,
  Edit,
  Link,
  DollarSign,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.userData.user);

  const renderRoleSpecificStats = () => {
    if (user.role === "teacher") {
      return (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Attendance</p>
              <p className="text-lg font-medium">90%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center">
              <Hash className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Subjects</p>
              <p className="text-lg font-medium">8</p>
            </div>
          </div>
        </div>
      );
    } else if (user.role === "student") {
      return (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Attendance</p>
              <p className="text-lg font-medium">85%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex justify-center items-center">
              <Hash className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Grade</p>
              <p className="text-lg font-medium">A</p>
            </div>
          </div>
        </div>
      );
    } else if (user.role === "principal") {
      return (
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex justify-center items-center">
              <Briefcase className="w-4 h-4 text-orange-500" />
            </div>
            <div className="p-3 rounded-lg">
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-lg font-black text-black">15+ years</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center">
              <Hash className="w-4 h-4 text-green-500" />
            </div>
            <div className="p-3 rounded-lg">
              <p className="text-sm text-gray-500">Teachers</p>
              <p className="text-lg font-black text-black">45</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <div className="p-3 rounded-lg">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-lg font-black text-black">$85,000</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderClassInfo = () => {
    if (user.role === "teacher") {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Class 10 B</h3>
          <p className="text-sm text-gray-500">Class Teacher</p>
        </div>
      );
    } else if (user.role === "student") {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Class 10 B</h3>
          <p className="text-sm text-gray-500">Student</p>
        </div>
      );
    }
    return null;
  };

  const renderPerformanceSection = () => {
    if (user.role === "teacher" || user.role === "principal") {
      return (
        <div className="mt-8">
          <h2 className="h2 text-xl font-bold mb-4 text-black text-left">
            Performance
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            criteria: student feedback
          </p>
          <div className="flex justify-center items-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="28"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  fontSize="16"
                  textAnchor="middle"
                  fill="#111827"
                  fontWeight="bold"
                >
                  9.2
                </text>
              </svg>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderImportantLinks = () => {
    if (user.role === "teacher") {
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-left text-black mb-6">
            Important Links
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-lamaPurpleLight text-gray-600 rounded-full text-sm">
              Teacher's Courses
            </span>
            <span className="px-3 py-1 bg-lamaYellowLight text-gray-600 rounded-full text-sm">
              Teacher's Students
            </span>
            <span className="px-3 py-1 bg-lamaSky text-gray-600 rounded-full text-sm">
              Teacher's Payment Status
            </span>
            <span className="px-3 py-1 bg-primaryBlue-400 text-gray-600 rounded-full text-sm">
              Teacher's Salary Details
            </span>
            <span className="px-3 py-1 bg-lamaPurpleLight text-gray-600 rounded-full text-sm">
              Teacher's Qualifications
            </span>
          </div>
        </div>
      );
    } else if (user.role === "student") {
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-left text-black mb-6">
            Important Links
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-lamaPurpleLight text-gray-600 rounded-full text-sm">
              Student's Courses
            </span>
            <span className="px-3 py-1 bg-lamaYellowLight text-gray-600 rounded-full text-sm">
              Attendance Records
            </span>
            <span className="px-3 py-1 bg-lamaSky text-gray-600 rounded-full text-sm">
              Payment Status
            </span>
            <span className="px-3 py-1 bg-primaryBlue-400 text-gray-600 rounded-full text-sm">
              Academic Records
            </span>
          </div>
        </div>
      );
    } else if (user.role === "principal") {
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-left text-black mb-6">
            Important Links
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-lamaPurpleLight text-gray-600 rounded-full text-sm">
              School Dashboard
            </span>
            <span className="px-3 py-1 bg-lamaYellowLight text-gray-600 rounded-full text-sm">
              Staff Records
            </span>
            <span className="px-3 py-1 bg-lamaSky text-gray-600 rounded-full text-sm">
              Financial Reports
            </span>
            <span className="px-3 py-1 bg-primaryBlue-400 text-gray-600 rounded-full text-sm">
              School Performance
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-cyan-50 sm:px-16 px-6 sm:py-16 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-cyan-200 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 flex md:flex-row flex-col gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center md:items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-blue-200 overflow-hidden flex justify-center items-center relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-blue-300" />
                )}
                <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full">
                  <Edit className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-800">
                    {user.name}
                  </h1>
                  <Edit className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-1">
                  {user.role === "teacher" &&
                    "Teacher details go here, example: Joined on 1st Jan 2023. Major in Computer Science. Currently teaching Algorithms."}
                </p>
                <p className="text-gray-500 text-sm">
                  Institution: {user.institution || "EduCloud"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="md:ml-auto flex flex-col justify-center">
              {renderRoleSpecificStats()}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-around">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primaryBlue" />
                <span className="text-sm text-primaryBlue">
                  {user.location || "Location"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purpleColor" />
                <span className="text-sm text-purpleColor">
                  {user.phone || "+91 12345678"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout for Bottom Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Important Links Section */}
          <div className="md:col-span-2">
            {renderImportantLinks()}
            {renderPerformanceSection()}
          </div>

          {/* Class Information */}
          <div>{renderClassInfo()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Add these styles to your global CSS or Tailwind config
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}
`;
