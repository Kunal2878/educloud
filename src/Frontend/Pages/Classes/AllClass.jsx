import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  PenSquare,
  GraduationCap,
  Plus,
  Loader,
  X,Eye,
} from "lucide-react";
import RegisterClass from "./RegisterClass";
import UpdateClasses from "./UpdateClass"
import { useSelector, useDispatch } from "react-redux";
import { setClassData,setCurrentPage } from "../../../Store/slice";
import { GetClasses } from '../../../service/api';

import Table from "../../Components/Elements/Table";
import Pagination from "../../Components/Elements/Pagination";

const AllClasses = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showUpdateClass, setshowUpdateClass] = useState(false);
  const [selectedClass, setselectedClass] = useState(null);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  });
  const classes = useSelector((state) => state.userData.ClassData);
  const currentPage = useSelector((state) => state.userData.CurrentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "All Classes";
       dispatch(setCurrentPage(1));
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await GetClasses(url);
      if (response.status === 200 || response.status === 204 || response.status === 201) {
        dispatch(setClassData(response.data.classes));
        setPaginationData({
          currentPage: response.data.pagination.currentPage|| 1,
          totalItems: response.data.pagination.totalItems,
          totalPages: response.data.pagination.totalPages,
          totalItemsPerPage: response.data.pagination.studentsPerPage ||10
        });
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

 
      fetchClasses();
    
  }, [currentPage]);

  const handleTimeTableClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const columns = [

    {
      field: 'classTeacher',
      headerName: 'Class Teacher',
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex flex-row justify-center items-center">
            <GraduationCap size={20} />
          </div>
          <span>{row.classTeacher?.name || "-"}</span>
        </div>
      ),
    },
    {
      field: 'className',
      headerName: 'Class',
    },
    {
      field: 'section',
      headerName: 'Section',
    },
    {
      field: 'timeTable',
      headerName: 'Time Table',
      renderCell: (row) => (
        row.timeTable && (
          <button
            onClick={() => handleTimeTableClick(row.timeTable)}
            className="p-1 hover:text-purpleColor transition-colors duration-200 transform hover:scale-110"
          >
            <Eye size={18} />
          </button>
        )
      ),
    },
  ];
  const handleEditClass = (classItem) => {

      setselectedClass(classItem);
      setshowUpdateClass(true);
  };

  const handleDeleteClass = (classItem) => {
 
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
      <div className="flex flex-col md:flex-row text-black-300 justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 text-2xl font-medium mb-2">All Classes</h2>
          <div className="flex items-center text-sm subtitle-2">
            <span className="mr-2">Classes /</span>
            <span>All Classes</span>
          </div>
        </div>
        <button
          onClick={() => setShowAddTeacher(true)}
          className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span>
            <Plus size={20} />
          </span>
        </button>
      </div>

      <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${showAddTeacher ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddTeacher(false);
          }
        }}
      >
        {showAddTeacher && (
          <div className={`
            relative rounded-lg w-auto max-h-[90vh] overflow-y-auto 
            bg-white 
            custom-scrollbar
            ${showAddTeacher ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}
            transition-all duration-300 ease-in-out
            transform origin-center
          `}>
            <button
              onClick={() => setShowAddTeacher(false)}
              className="absolute top-6 lg:top-6 right-6 p-2 bg-white rounded-full text-black-300 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <RegisterClass onClose={() => setShowAddTeacher(false)} />
          </div>
        )}
      </div>
 <div
        className={`
          fixed inset-0 flex items-center justify-center 
          bg-black bg-opacity-50 z-50 
          ${
            showUpdateClass
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          transition-all duration-300 ease-in-out
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setshowUpdateClass(false);
          }
        }}
      >
        {showUpdateClass && selectedClass && (
          <div
            className={`
              relative rounded-xl w-auto max-h-[90vh] overflow-y-auto 
              bg-white
              custom-scrollbar
              ${
                showUpdateClass
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              }
              transition-all duration-300 ease-in-out
              transform origin-center
            `}
          >
            <button
              onClick={() => setshowUpdateClass(false)}
              className="absolute top-6 right-4 p-2 bg-white rounded-full text-black-300 transition-colors duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <UpdateClasses 
              classData={selectedClass} 
              // isUpdate={true} 
              onClose={() => {
                setshowUpdateClass(false);
                setselectedClass(null);
              }} 
            />
          </div>
        )}
      </div>



      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md bg-slate-100 text-gray-600">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by class or teacher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={classes || []}
          checkboxSelection={false}
          actions={true}
          onEdit={handleEditClass}
          onDelete={handleDeleteClass}
          extraClasses="m-4"
        />
      </div>

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

export default AllClasses;