
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';

const MySubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('your-api-endpoint/subjects');
        setSubjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subjects');
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <BookOpen className="w-16 h-16" />
          <p className="text-xl">No subjects available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Subjects</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject Code</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Credits</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Instructor</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{subject.code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{subject.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{subject.credits}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{subject.instructor}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${subject.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    subject.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {subject.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubjects;
