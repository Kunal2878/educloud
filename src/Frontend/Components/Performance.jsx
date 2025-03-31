import React, { useState, useEffect } from "react";
import CustomCalander from '../Components/Elements/CustomCalander'
import {
  GraduationCap,
  Pen,
  TrendingUp,
  Calendar,
  IndianRupee,

} from "lucide-react";
import Cookies from "js-cookie";
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
import {Link} from "react-router-dom"
import { setUser,setStudentCount,setTeacherCount,setGenderRatio } from "../../Store/slice";
import { GetAllStudentCountAPI, GetAllTeacherCountAPI,GetGenderRatioAPI } from '../../service/api';

const PerformanceDashboard = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token")
  const user = useSelector((state) => state.userData.user);
  const [error, setError] = useState('')
  const dispatch= useDispatch();
  const StudentCount= useSelector((state) => state.userData.StudentCount);
  const TeacherCount= useSelector((state) => state.userData.TeacherCount);
  const GenderRatio = useSelector((state) => state.userData.GenderRatio);


  const StudentData = [
    { name: "Performance", value: "Under Maintenance", Icon: TrendingUp },
    { name: "Days present", value: "Under Maintenance", Icon: Calendar },
    { name: "feedback", value: "Under Maintenance", Icon: GraduationCap },
  ];
  const TeachData = [
    { name: "Performance", value: "Under Maintenance", Icon: TrendingUp },
    { name: "Leave records", value: "Under Maintenance", Icon: Calendar },
    { name: "feedback", value: "Under Maintenance", Icon: GraduationCap },
  ];
  const PrincipalData = [
    { name: "Students", value: `${StudentCount}`, Icon: GraduationCap, path:"/all-students" },
    { name: "Teachers", value: `${TeacherCount}`, Icon: Pen, path:"/all-teachers" },
    { name: "Earnings", value: "Under Maintenance", Icon: IndianRupee },
  ];
  const [selectedClass, setSelectedClass] = useState("Class A");
  const [selectedDate,  setSelectedDate] = useState("2024-05-05");
  const [isLoading,  setIsLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false);

  // const MALE_COLOR = "#8B31FF";
  // const FEMALE_COLOR = "#FF9839";
  const MALE_COLOR = "#8C86D9";
  const FEMALE_COLOR = "#E9A7C9";
  const MALE_FADED = "#E9DFFF";
  const FEMALE_FADED = "#FFE9D5";

  const pieData =
    user.role === "principal"
      ? [
          { name: "Male Active", value: GenderRatio?.ratioMale},
          // { name: "Male Inactive", value: 100-GenderRatio?.ratioMale },
          { name: "Female Active", value: GenderRatio?.ratioFemale},
          // { name: "Female Inactive", value: 100-GenderRatio?.ratioFemale },
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


  useEffect(() => {
    document.title = "Dashboard";
}, []);
  useEffect(() => {
    setIsLoading(true);
    setShowCharts(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowCharts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedClass, selectedDate]);

 

  useEffect(() => {
    const fetchStudentsCount = async () => {
     

        const response = await GetAllStudentCountAPI(url);
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          dispatch(setStudentCount(response.data.data));
       
        } else {
          // setError(response.message);
        }
     
    };

    const fetchTeachersCount = async () => {

        const response = await GetAllTeacherCountAPI(url);
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          dispatch(setTeacherCount(response.data.data));
        } else {
          setError(response.message);
        }
    };
    const fetchGenderRatio = async () => {

        const response = await GetGenderRatioAPI(url,token);
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          dispatch(setGenderRatio(response.data));
        } else {
          setError(response.message);
          if (response.status === 401) {  
            Cookies.remove('user');
            Cookies.remove('token');
            window.location.href = '/user-options';                      
          }
        }
    };

    fetchStudentsCount();
    fetchTeachersCount();
    fetchGenderRatio();
  }, []);

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10">
      <div className="mb-4 text-left">
        <div className="flex flex-col gap-2 sm:text-3xl text-xl capitalize font-medium text-black">
          <h1 className="h1">
            Welcome <span className="waving-hand">👋</span>,
            <span className="text-primaryBlue"> {user.name}</span>
          </h1>
          <span className="h2 text-black-300">
            Your success is our priority!
          </span>
        </div>
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
                {card.value ? card.value : <span className="inline-block animate-spin">⌛</span>}
              </p>
            </div>

            <Link to={card.path}>
              <card.Icon
                className={`w-8 h-8 flex-shrink-0 ${
                  index === 0
                    ? "text-purpleColor"
                    : index === 1
                    ? "text-primaryBlue"
                    : "text-green-500"
                }`}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12   ">
        <div
          className=" p-4  rounded-lg  transform transition-all duration-500 ease-out mb-6 lg:mb-0"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : "20px"})`,
            transitionDelay: "400ms",
          }}
        >
          <h2 className="h2 text-black-300  mb-4 text-left">
            {user.role === "principal"
              ? "Student Ratio"
              : user.role === "teacher"
              ? "Attendance Distribution"
              : "Task Completion"}
          </h2>
          <div className="relative w-64 h-64  mx-auto">
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
                    <Cell key="inactive" fill={FEMALE_COLOR} strokeWidth={0} />
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
                    <Cell key="active" fill={MALE_COLOR} strokeWidth={0} />
                    <Cell key="inactive" fill={FEMALE_COLOR} strokeWidth={0} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="flex flex-row space-x-4 jsutify-center items-center">
                <img className="w-16 h-20" src="/f_m.png" />
              </div>
            </div>

            <div className="flex justify-center mb-8">
  <div className="flex flex-row space-x-12">
    {/* Male Column */}
    <div className="flex flex-col items-center">
      {/* Male Count */}
      <div className="flex items-center mb-2">
              {user.role === 'principal' && (
                <>
                <div
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: MALE_COLOR }}
                ></div>
                  <span className="text-sm mr-2" style={{ color: MALE_COLOR }}>Male</span>
                  <span className="text-sm" style={{ color: MALE_COLOR }}>{GenderRatio?.maleCount}</span>
                </>
              )}
      </div>
      
      {/* Male Ratio */}
      <div className="flex flex-col items-center">
        <div className="flex items-center">
                  {user.role === 'principal' && (
<>
          <div
            className="w-3 h-3 rounded-full mr-1"
            style={{ backgroundColor: MALE_COLOR }}
          ></div>

                    <span className="text-sm" style={{ color: MALE_COLOR }}>Male Ratio</span>

                    </>
                  )}        
                  
                  </div>
        {user.role === 'principal' && (
          <span className="text-sm" style={{ color: MALE_COLOR }}>
            {((GenderRatio?.maleCount / (GenderRatio?.maleCount + GenderRatio?.femaleCount)) * 100).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
    
    {/* Female Column */}
    <div className="flex flex-col items-center">
      {/* Female Count */}
      <div className="flex items-center mb-2">


        {user.role === 'principal' && (
          <>
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: FEMALE_COLOR }}
            ></div>
            <span className="text-sm mr-2" style={{ color: FEMALE_COLOR }}>Female</span>
            <span className="text-sm" style={{ color: FEMALE_COLOR }}>{GenderRatio?.femaleCount}</span>
          </>
        )}      </div>
      
      {/* Female Ratio */}
      <div className="flex flex-col items-center">

        <div className="flex items-center">
          {user.role === 'principal' && (
            <>
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: FEMALE_COLOR }}
            ></div>

            <span className="text-sm" style={{ color: FEMALE_COLOR }}>Female Ratio</span>
            </>
          )}
        </div>
        {user.role === 'principal' && (
          <span className="text-sm" style={{ color: FEMALE_COLOR }}>
            {((GenderRatio?.femaleCount / (GenderRatio?.maleCount + GenderRatio?.femaleCount)) * 100).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
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
          <div className="h-76">
            <CustomCalander />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PerformanceDashboard;
