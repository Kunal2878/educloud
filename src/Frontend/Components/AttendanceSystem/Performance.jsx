import React, { useState, useEffect } from 'react';
import { GraduationCap, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../../../Store/slice";
const PerformanceDashboard = () => {
const user = useSelector((state) => state.userData.user)

const StudentData =[{ performance: '85%', days_Present:46, feedback:"Excellent" }]
const TeachData=[{performance: '90%', leave: 2, feedback:"Good"}]
const PrincipalData=[{stu_num:10000, teach_num:200, earning:"$4.2M"}]

  const [selectedClass, setSelectedClass] = useState('Class A');
  const [selectedDate, setSelectedDate] = useState('2024-05-05');
  const [isLoading, setIsLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false);

  // Sample data
  const attendanceData = [
    { day: '1', totalPresent: 8, totalAbsent: 2 },
    { day: '2', totalPresent: 8, totalAbsent: 2 },
    { day: '3', totalPresent: 2, totalAbsent: 4 },
    { day: '4', totalPresent: 4, totalAbsent: 7 },
    { day: '5', totalPresent: 6, totalAbsent: 6 },
    { day: '6', totalPresent: 5, totalAbsent: 5 },
    { day: '7', totalPresent: 3, totalAbsent: 3 },
    { day: '8', totalPresent: 2, totalAbsent: 4 },
  ];

  const pieData = [
    { name: 'Male', value: 85 },
    { name: 'Female', value: 60 },
  ];

  const financialData = [
    { year: '2020', revenue: 1200000, expenses: 800000 },
    { year: '2021', revenue: 1500000, expenses: 1000000 },
    { year: '2022', revenue: 1800000, expenses: 1200000 },
    { year: '2023', revenue: 2100000, expenses: 1400000 },
    { year: '2024', revenue: 2300000, expenses: 1600000 },
  ];

  const COLORS = ['#4287f5', '#40c4a7'];

  const classes = ['Class A', 'Class B', 'Class C', 'Class D'];

  // Simulate loading and trigger animations
  useEffect(() => {
    setIsLoading(true);
    setShowCharts(false);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowCharts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedClass, selectedDate]);
    const statsCards = [
      { title: 'Students', value: '10000', Icon: GraduationCap },
      { title: 'Teachers', value: '200', Icon: Calendar },
      { title: 'Earning', value: '$2.3M', Icon: TrendingUp },
    ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      

      {/* Stats Cards with fade-in animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full bg-gray-50 p-4 rounded-lg shadow-lg">
        {statsCards.map((card, index) => (
          <div 
            key={card.title}
            className={`p-4 rounded-lg flex items-center justify-between transform transition-all duration-500 ease-out overflow-hidden ${
              index === 0 ? 'bg-purple-100' : 
              index === 1 ? 'bg-blue-100' : 
              'bg-green-100'
            }`}
            style={{
              opacity: showCharts ? 1 : 0,
              transform: `translateY(${showCharts ? 0 : '20px'})`,
              transitionDelay: `${index * 100}ms`,
              minWidth: 0
            }}
          >
            <div className="min-w-0">
              <p className="text-gray-500 truncate">{card.title}</p>
              <p className="text-2xl font-bold text-black truncate">{card.value}</p>
            </div>
            <card.Icon className={`w-8 h-8 flex-shrink-0 ${
              index === 0 ? 'text-purple-500' : 
              index === 1 ? 'text-blue-500' : 
              'text-green-500'
            }`} />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div 
          className="bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : '20px'})`,
            transitionDelay: '300ms'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <div className="h-64">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line 
                    type="monotone"
                    dataKey="totalPresent" 
                    stroke="#8d08a0" 
                    name="Present"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Line 
                    type="monotone"
                    dataKey="totalAbsent" 
                    stroke="#19c3b6" 
                    name="Absent"
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div 
          className="bg-gray-50 p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : '20px'})`,
            transitionDelay: '400ms'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Male/Female Ratio</h2>
          <div className="h-64">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    label={({ name }) => name}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#A855F7' : '#EAB308'} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>            )}
          </div>
        </div>
      </div>

      {/* Financial Chart */}
      <div 
        className="mt-12 bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
        style={{
          opacity: showCharts ? 1 : 0,
          transform: `translateY(${showCharts ? 0 : '20px'})`,
          transitionDelay: '500ms'
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Financial Overview (5 Years)</h2>
        <div className="h-80">
          {!isLoading && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Bar 
                  dataKey="revenue" 
                  fill="#8d08a0" 
                  name="Revenue"
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="expenses" 
                  fill="#19c3b6" 
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
    </div>
  );
};

export default PerformanceDashboard;