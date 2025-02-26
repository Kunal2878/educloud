  import { useState } from 'react';
  import { toast } from 'react-toastify';

  const CreateExam = () => {
    const [examData, setExamData] = useState({
      name: '',
      date: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('api/exam/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(examData)
        });
      
        if (response.ok) {
          setExamData({ name: '', date: '' });
          toast.success('Exam created successfully!');
        } else {
          throw new Error('Failed to create exam');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to create exam');
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Create New Exam</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <input 
                        type="text"
                        className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 placeholder-transparent"
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
                        className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                        value={examData.date}
                        onChange={(e) => setExamData({...examData, date: e.target.value})}
                        required
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                        Exam Date
                      </label>
                    </div>
                    <div className="relative">
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full transition duration-200"
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
