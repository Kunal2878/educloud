import React, { useState, useEffect } from 'react';
import { Search, Trash2, PenSquare, GraduationCap, Plus, Loader, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {Link} from 'react-router-dom'
import AddTeachers from './Addteacher'
const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const teachersPerPage = 10;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://school-backend-ocze.onrender.com/api/v1/teacher/all-teachers');
        const data = await response.json();
        
        if (data.statusCode === 200) {
          setTeachers(data.data.teachers);
        } else {
          setError('Failed to fetch teachers');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Filter teachers based on search and class
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClass === 'all' || teacher.assignedClasses.includes(selectedClass))
  );

  // Pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

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
    <div className="pl-6 pr-6 pb-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row text-gray-600 justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2">All Teachers </h1>
          <div className="flex items-center text-sm ">
            <span className="mr-2">Teachers /</span>
            <span > All Teachers</span>
          </div>
        </div>
        <button onClick={() => setShowAddTeacher(true)} className="p-2 border-2  border-primaryBlue text-sm text-primaryBlue rounded-full  transition-colors duration-200 transform hover:scale-105">
          <span>
            <Plus size={24} />
          </span>{" "}
        </button>
      </div>

      {showAddTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddTeacher(false);
          }
        }}>
          <div className="relative rounded-lg w-auto max-w-4xl p-4">
            <button
              onClick={() => setShowAddTeacher(false)}
              className="absolute top-6 lg:top-4 right-2 p-2 bg-white rounded-full text-gray-600 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110 shadow-md"
            >
              <X size={24} />
            </button>
            <AddTeachers onClose={() => setShowAddTeacher(false)} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 ">
          <div className="relative flex-1 max-w-md bg-slate-100 text-gray-600">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  " size={20} />
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
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 mr-4 bg-slate-100 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              <option value="all">All Classes</option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-gray-600 text-xs">
          <table className="w-full min-w-[768px] pb-10">
            <thead className='bg-purple-100'>
              <tr className="border-b">
                <th className="p-4">
                  <input type="checkbox" className="rounded bg-white accent-purple-500" />
                </th>
                <th className="p-4 text-left">Teacher's Name</th>
                <th className="p-4 text-center">Email</th>
                <th className="p-4 text-center">Subjects</th>
                <th className="p-4 text-center">Assigned Classes</th>
                <th className="p-4 text-center">Role</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                >
                  <td className="p-4">
                    <input type="checkbox" className="rounded bg-white accent-purple-500" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex flex-row justify-center items-center">
                      <GraduationCap size={20}/>
                      </div>
                      <span className="hover:text-purple-500 transition-colors duration-200">
                        {teacher.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{teacher.email}</td>
                  <td className="p-4">{teacher.subject.length ? teacher.subject.join(', ') : '-'}</td>
                  <td className="p-4">{teacher.assignedClasses.length ? teacher.assignedClasses.join(', ') : '-'}</td>
                  <td className="p-4">{teacher.role || '-'}</td>
                  <td className="p-4">
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
      </div>

      {/* Pagination */}
      <div className="bottom-0 max-w-screen-xl border-t p-4 flex justify-between items-center">
        
         
          <div className="w-full flex justify-center items-center gap-2">
            {renderPaginationButtons()}
          </div>
      
      </div>
    </div>
  );
};

const styles = document.createElement('style');
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

export default TeacherDetails;