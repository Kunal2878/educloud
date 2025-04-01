import React, { useState } from 'react';
import { X, Check, XCircle, Loader } from 'lucide-react';
import { setShowConfirmationModel,setConfirmRequest } from "../../../Store/slice";
import { useSelector, useDispatch } from "react-redux";
const Confirmation = ({ message, note }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userData.status);
  const addText = useSelector((state) => state.userData.addText);
  const confirmRequest = useSelector((state) => state.userData.confirmRequest);


  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button
            onClick={() => dispatch(setShowConfirmationModel(false))}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            {status && (
              <div className="flex items-center justify-center mb-4">
                {status === 'success' && <Check className="text-green-500" size={40} />}
                {status === 'error' && <XCircle className="text-red-500" size={40} />}
              </div>
            )}
            
            {!status && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-black-300">
                  {message || "Confirmation Required"}
                </h3>
                
                {note && (
                  <p className="text-sm text-gray-600 mb-2">{note}</p>
                )}
              </>
            )}
            
            {addText && (
              <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {addText}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            
            <button
              onClick={async () => {
              
                dispatch(setConfirmRequest(true));
              
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={loading}
              style={{ display: status === '' ? 'flex' : 'none' }} 
            >
              {(confirmRequest && !status) ? (
                <Loader className="animate-spin mr-2" size={16} />
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;