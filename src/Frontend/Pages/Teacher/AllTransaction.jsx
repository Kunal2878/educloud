  import React, { useState, useEffect } from "react";
  import {
    Search,
    Loader,
    IndianRupee,
    Plus,
    X,Calendar
  } from "lucide-react";
  import AddTransaction from "./AddTransaction";
  import { useSelector, useDispatch } from "react-redux";
  import { setTransactionData, setCurrentPage } from "../../../Store/slice";
  import { GetTransactionsByTeacherAPI } from '../../../service/api';
  import Table from "../../Components/Elements/Table";
  import Pagination from "../../Components/Elements/Pagination";

  const AllTransaction = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [paginationData, setPaginationData] = useState({
      currentPage: 1,
      totalItems: 0,
      totalPages: 0
    });
    const transactions = useSelector((state) => state.userData.TransactionData);
    const url = import.meta.env.VITE_API_BASE_URL;
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.userData.CurrentPage);

    useEffect(() => {
      document.title = "All Transactions";
      dispatch(setCurrentPage(1));
    }, []);

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          setLoading(true);
          const month = selectedMonth.getMonth() + 1;
          const year = selectedMonth.getFullYear();
          const response = await GetTransactionsByTeacherAPI(url, currentPage, month, year);
          if (response.status === 200 || response.status === 204 || response.status === 201) {
            dispatch(setTransactionData(response.data.transactions));
            setPaginationData({
              currentPage: response.data.pagination.currentPage || 1,
              totalItems: response.data.pagination.totalItems,
              totalPages: response.data.pagination.totalPages,
              totalItemsPerPage: response.data.pagination.transactionsPerPage || 10
            });
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError(err.message || "Failed to fetch transactions");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }, [currentPage, selectedMonth]);

    const handlePageChange = (newPage) => {
      dispatch(setCurrentPage(newPage));
    };

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
      dispatch(setCurrentPage(1));
    };

    const handleMonthChange = (e) => {
      const [year, month] = e.target.value.split('-');
      const date = new Date(year, month - 1);
      setSelectedMonth(date);
    };

    const getFormattedMonth = () => {
      const year = selectedMonth.getFullYear();
      const month = (selectedMonth.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    };

    const columns = [
      {
        field: 'transactionId',
        headerName: "Transaction ID",
      },
      {
        field: 'amount',
        headerName: 'Amount',
        renderCell: (row) => (
          <div className="flex items-center gap-2">
            <IndianRupee size={16} />
            <span>{row.amount}</span>
          </div>
        ),
      },
      {
        field: 'date',
        headerName: 'Date',
        renderCell: (row) => new Date(row.date).toLocaleDateString(),
      },
      {
        field: 'type',
        headerName: 'Type',
      },
      {
        field: 'status',
        headerName: 'Status',
      }
    ];

    const handleDeleteTransaction = async (transaction) => {
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

  

    return (
      <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
        {/* Add Transaction Modal */}
        <div
          className={`
            fixed inset-0 flex items-center justify-center 
            bg-black bg-opacity-50 z-50 
            ${showAddTransaction ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
            transition-all duration-300 ease-in-out
          `}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddTransaction(false);
            }
          }}
        >
          {showAddTransaction && (
            <div className="relative rounded-xl w-auto max-h-[90vh] overflow-y-auto bg-white custom-scrollbar space-y-4">
              <button
                onClick={() => setShowAddTransaction(false)}
                className="absolute top-4  right-4 p-2 bg-white rounded-full text-black-300 transition-colors duration-200 transform hover:scale-110"
              >
                <X size={24} />
              </button>
              <AddTransaction onClose={() => setShowAddTransaction(false)} />
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-[32px] p-2">
          <div className="mb-4 md:mb-0">
            <h2 className="h2 mb-2">All Transactions</h2>
            <div className="flex items-center subtitle-2">
              <span className="">Transactions / </span>
              <span>All Transactions</span>
            </div>
          </div>
          <button
            onClick={() => setShowAddTransaction(true)}
            className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
          >
            <Plus size={24} />
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
                placeholder="Search transactions"
                value={searchQuery}
                onChange={handleSearch}
                className="h-11 w-full pl-10 pr-4 py-2 border rounded-lg bg-lamaSkyLight text-black-300 transition-all duration-200"
              />
            </div>

            <div className="flex gap-4 mr-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
                <input
                  type="month"
                  value={getFormattedMonth()}
                  onChange={handleMonthChange}
                  className="p-2 pl-10 border rounded-lg bg-primary-300 text-black-300 border-lamaSkyLight transition-all duration-200 [color-scheme:light]"
                />
              </div>
            </div>
          </div>

          {/* Table Component */}
          <Table
            columns={columns}
            data={transactions || []}
            checkboxSelection={false}
            actions={true}
            onDelete={handleDeleteTransaction}
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

  export default AllTransaction;