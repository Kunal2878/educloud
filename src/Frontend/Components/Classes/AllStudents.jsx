import React, { useState, useEffect } from "react";
import {
  Search,
  Loader,
  GraduationCap,
  Plus,
  X,
  Eye,
} from "lucide-react";
import AddStudents from "../../Pages/Student/AddStudent";
import UpdateStudents from "../../Pages/Student/UpdateStudent";
import ViewStudentDetails from '../../Pages/Student/ViewStudentsDetails/ViewStudentDetails';
import { useSelector, useDispatch } from "react-redux";
import { setStudentData, setCurrentPage } from "../../../Store/slice";
import { GetStudents } from '../../../service/api';
import Table from "../Elements/Table";
import Pagination from "../Elements/Pagination";

const StudentDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showUpdateStudent, setShowUpdateStudent] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  });
  const students = useSelector((state) => state.userData.StudentData);
  const url = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.userData.CurrentPage);

  useEffect(() => {
    document.title = "Student Details";
    dispatch(setCurrentPage(1));
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await GetStudents(url, currentPage);
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          dispatch(setStudentData(response.data.students));
         
          // Update pagination data from API response
          setPaginationData({
            currentPage: response.data.pagination.currentPage|| 1,
            totalItems: response.data.pagination.totalItems,
            totalPages: response.data.pagination.totalPages,
            totalItemsPerPage: response.data.pagination.studentsPerPage ||10
          });
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle class filter
  const handleClassFilter = (e) => {
    setTimeFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Table columns definition
  const columns = [
    {
      field: 'name',
      headerName: "Student's Name",
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-lamaPurpleLight rounded-full overflow-hidden flex flex-row justify-center items-center">
            <GraduationCap size={20} />
          </div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'studentClass',
      headerName: 'Class',
      renderCell: (row) => row.studentClass?.className || "-",
    },
    {
      field: 'parentName',
      headerName: 'Parent Name',
    },
    {
      field: 'parentContact',
      headerName: 'Parent Contact',
    },
    {
      field: 'view',
      headerName: 'View',
      renderCell: (row) => (
        <Eye
          className=" cursor-pointer text-blue-500 hover:text-blue-700"
          size={20}
          onClick={() => handleViewStudent(row)}
        />
      ),
    },
  ];

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowUpdateStudent(true);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewStudent(true);
  };

  const handleDeleteStudent = (student) => {
    // Implement delete functionality
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
      <div className="flex justify-center items-center min-h-screen text-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
      {/* Add Student Modal */}
      <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${
            showAddStudent
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddStudent(false);
          }
        }}
      >
        {showAddStudent && (
          <div
            className={`
              relative rounded-xl w-auto max-h-[90vh] overflow-y-auto 
              bg-white
              custom-scrollbar
              ${
                showAddStudent
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              }
              transition-all duration-300 ease-in-out
              transform origin-center
            `}
          >
            <button
              onClick={() => setShowAddStudent(false)}
              className="absolute top-6 right-4 p-2 bg-white rounded-full text-black-300 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <AddStudents onClose={() => setShowAddStudent(false)} />
          </div>
        )}
      </div>
      
      {/* Update Student Modal */}
      <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${
            showUpdateStudent
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowUpdateStudent(false);
          }
        }}
      >
        {showUpdateStudent && selectedStudent && (
          <div
            className={`
              relative rounded-xl w-auto max-h-[90vh] overflow-y-auto 
              bg-white
              custom-scrollbar
              ${
                showUpdateStudent
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              }
              transition-all duration-300 ease-in-out
              transform origin-center
            `}
          >
            <button
              onClick={() => setShowUpdateStudent(false)}
              className="absolute top-6 right-4 p-2 bg-white rounded-full text-black-300 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <UpdateStudents 
              studentData={selectedStudent} 
              // isUpdate={true} 
              onClose={() => {
                setShowUpdateStudent(false);
                setSelectedStudent(null);
              }} 
            />
          </div>
        )}
      </div>

      {/* View Student Modal */}
      <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${
            showViewStudent
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowViewStudent(false);
          }
        }}
      >
        {showViewStudent && selectedStudent && (
          <div
            className={`
              relative rounded-xl w-auto max-h-[90vh] overflow-y-auto 
              bg-white
              custom-scrollbar
              ${
                showViewStudent
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              }
              transition-all duration-300 ease-in-out
              transform origin-center
            `}
          >
            <button
              onClick={() => setShowViewStudent(false)}
              className="absolute top-4  mb-4 right-4 p-2  rounded-full text-black-300 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <ViewStudentDetails 
              studentData={selectedStudent}
              onClose={() => {
                setShowViewStudent(false);
                setSelectedStudent(null);
              }}
            />
          </div>
        )}
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-[32px] p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 mb-2">All Students</h2>
          <div className="flex items-center subtitle-2">
            <span className="">Students / </span>
            <span>All Students</span>
          </div>
        </div>
        <button
          onClick={() => setShowAddStudent(true)}
          className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <h1 className="h1">
            <Plus size={24} />
          </h1>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-2 rounded-md shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mt-[16px] mb-[32px] bg-white">
          <div className="relative flex-1 max-w-md text-black p-2 ml-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              className="h-11 w-full pl-10 pr-4 py-2 border rounded-lg bg-lamaSkyLight text-black-300 transition-all duration-200"
            />
          </div>

          <div className="flex gap-4 mr-4">
            <select
              value={timeFilter}
              onChange={handleClassFilter}
              className="p-2 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            >
              <option value="">All Classes</option>
              <option value="Class 1A">Class 1A</option>
              <option value="Class 1B">Class 1B</option>
              <option value="Class 2A">Class 2A</option>
              <option value="Class 2B">Class 2B</option>
              <option value="Class 3A">Class 3A</option>
              <option value="Class 3B">Class 3B</option>
              <option value="Class 4A">Class 4A</option>
              <option value="Class 4B">Class 4B</option>
              <option value="Class 5A">Class 5A</option>
              <option value="Class 5B">Class 5B</option>
              <option value="Class 6A">Class 6A</option>
              <option value="Class 6B">Class 6B</option>
              <option value="Class 7A">Class 7A</option>
              <option value="Class 7B">Class 7B</option>
              <option value="Class 8A">Class 8A</option>
              <option value="Class 8B">Class 8B</option>
              <option value="Class 9A">Class 9A</option>
              <option value="Class 9B">Class 9B</option>
              <option value="Class 10A">Class 10A</option>
              <option value="Class 10B">Class 10B</option>
            </select>
          </div>
        </div>

        {/* Table Component */}
        <Table
          columns={columns}
          data={students || []}
          checkboxSelection={false}
          actions={true}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          extraClasses="m-4"
        />
      
      </div>

      {/* Pagination Component */}
      {paginationData.totalPages > 0 && (
        <Pagination
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

// Add custom animation class
const styles = document.createElement("style");
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

export default StudentDetails;