import { useState } from 'react';

import Toast from '../../Components/Toast';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    name: '',
    date: ''
  });
  const [timeTableFile, setTimeTableFile] = useState(null);
const url = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/v1/principal/create-exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData)
      });
    
      if (response.ok) {
        if (timeTableFile) {
          const formData = new FormData();
          formData.append('timeTable', timeTableFile);
          
          const timeTableResponse = await fetch(`${url}/api/v1/principal/upload-exam-timetable`, {
            method: 'POST',
            body: formData
          });
          
          if (!timeTableResponse.ok) {
            throw new Error('Failed to upload time table');
          }
        }
        
        setExamData({ name: '', date: '' });
        setTimeTableFile(null);
        <Toast message="Exam created successfully!" iconName="right" />;
      } else {
        throw new Error('Failed to create exam');
      }
    } catch (error) {
      console.error('Error:', error);
      <Toast message="Failed to create exam" iconName="wrong" />;
    }
  };

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800"><span className='text-purpleColor'>Create</span> New Exam</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text"
                      className="peer w-full border-b-2 bg-primary-300 text-black-300 border-lamaSkyLight placeholder-transparent mt-3"
                      placeholder="Exam Name"
                      value={examData.name}
                      onChange={(e) => setExamData({...examData, name: e.target.value})}
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Exam Name
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="date"
                      className="peer w-full border-b-2 bg-primary-300 text-black-300 border-lamaSkyLight mt-4 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:text-purple-500 [&::-webkit-calendar-picker-indicator]:opacity-100"
                      value={examData.date}
                      onChange={(e) => setExamData({...examData, date: e.target.value})}
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                      Exam Date
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="file"
                      className="peer w-full border-b-2 bg-primary-300 text-black-300 border-lamaSkyLight mt-4"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file && file.size <= 5 * 1024 * 1024) {
                          setTimeTableFile(file)
                        } else {
                          alert('File size should be less than 5 MB')
                          e.target.value = ''
                        }
                      }}
                      accept=".pdf,.doc,.docx"                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm mb-4">
                      Time Table (Optional)
                    </label>
                  </div>
                  <div className="relative">
                    <button 
                      type="submit"
                      className="border-2 border-purple-500 text-purple-500 rounded-md px-6 py-2  w-full transition duration-200"
                    >
                      Create Exam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;