  import { useState,useEffect } from 'react';
  import { Check, ChevronDown, School, BookOpen } from 'lucide-react';
import Toast from '../../Components/Toast';
  const AssignClassSub = () => {
    const [teacherId, setTeacherId] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedClassIds, setSelectedClassIds] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('classes');
    const [classData, setClassData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
    const url = import.meta.env.VITE_API_BASE_URL;
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${url}/api/v1/class/all-classes`);
        const data = await response.json();
        setClassData(data.data.classes);
        console.log(data.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    useEffect(() => {
      fetchClasses();
    }, []);

    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry'];

    const handleTeacherIdChange = (e) => {
      setTeacherId(e.target.value);
    };

    const toggleClass = (className, classId) => {
      setSelectedClasses(prev => 
        prev.includes(className) 
          ? prev.filter(c => c !== className)
          : [...prev, className]
      );
      setSelectedClassIds(prev =>
        prev.includes(classId)
          ? prev.filter(id => id !== classId)
          : [...prev, classId]
      );
    };

    const toggleSubject = (subject) => {
      setSelectedSubjects(prev => 
        prev.includes(subject) 
          ? prev.filter(s => s !== subject)
          : [...prev, subject]
      );
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        if (activeTab === 'subjects') {
          await fetch(`${url}/teacher/api/v1/${teacherId}/assign-subjects`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subjects: selectedSubjects
            })
          });
          setShowToast({ show: true, message: 'Successfully assigned subjects', type: 'right' });
          setSelectedSubjects([]);
        } else {
          await fetch(`${url}/api/v1/teacher/${teacherId}/assign-classes`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              classes: selectedClassIds
            })
          });
          setShowToast({ show: true, message: 'Successfully assigned classes', type: 'right' });
          setSelectedClasses([]);
          setSelectedClassIds([]);
        }
        setTeacherId('');
      } catch (error) {
        console.error('Error:', error);
        setShowToast({ show: true, message: `Failed to assign ${activeTab}`, type: 'wrong' });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen p-4 md:p-8">
        {showToast.show && <Toast message={showToast.message} iconName={showToast.type} />}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6"><span className='text-purpleColor'>Assign</span> Classes and Subjects</h1>
        
          <div className="flex mb-4 md:mb-6">
            <button
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 text-sm md:text-base ${activeTab === 'classes' ? 'bg-purple-500 text-white' : 'border-2 border-purple-500 text-purple-500'} rounded-l-lg`}
              onClick={() => setActiveTab('classes')}
            >
              Assign Classes
            </button>
            <button
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 text-sm md:text-base ${activeTab === 'subjects' ? 'bg-purple-500 text-white' : 'border-2 border-purple-500 text-purple-500'} rounded-r-lg`}
              onClick={() => setActiveTab('subjects')}
            >
              Assign Subjects
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="relative">
              <input
                type="text"
                value={teacherId}
                onChange={handleTeacherIdChange}
                className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-primary-300 text-black-300 border-lamaSkyLight border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent text-sm md:text-base"
                placeholder="Teacher ID"
                id="teacherId"
                required
              />
              <label htmlFor="teacherId" className="absolute left-2 md:left-3 -top-5 text-xs md:text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs md:peer-focus:text-sm">
                <span className="text-red-500">*</span>Teacher ID
              </label>
            </div>

            {activeTab === 'classes' ? (
              <div className="relative">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Select Classes
                </label>
                <button
                  type="button"
                  onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                  className="w-full flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 border rounded-md bg-white text-sm md:text-base"
                >
                  <div className="flex items-center">
                    <School className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-500" />
                    <span>{selectedClasses.length ? `${selectedClasses.length} classes selected` : 'Select classes'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                </button>
              
                {isClassDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {classData.map((classItem) => (
                      <div
                        key={classItem._id}
                        onClick={() => toggleClass(classItem.className, classItem._id)}
                        className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                      >
                        <div className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${selectedClasses.includes(classItem.className) ? 'bg-purple-500 text-white' : 'border-gray-300'}`}>
                          {selectedClasses.includes(classItem.className) && <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />}
                        </div>
                        {classItem.className}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Select Subjects
                </label>
                <button
                  type="button"
                  onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                  className="w-full flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 border rounded-md bg-white text-sm md:text-base"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-500" />
                    <span>{selectedSubjects.length ? `${selectedSubjects.length} subjects selected` : 'Select subjects'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                </button>
              
                {isSubjectDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {subjects.map((subject) => (
                      <div
                        key={subject}
                        onClick={() => toggleSubject(subject)}
                        className="flex items-center px-2 md:px-4 py-1.5 md:py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                      >
                        <div className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${selectedSubjects.includes(subject) ? 'bg-purple-500  text-white' : 'border-gray-300'}`}>
                          {selectedSubjects.includes(subject) && <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />}
                        </div>
                        {subject}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full border-2 border-purple-500 cursor-pointer text-purple-500 py-1.5 md:py-2 px-2 md:px-4 rounded-md transition duration-200 text-sm md:text-base flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purpleColor"></div>
              ) : (
                activeTab === 'classes' ? 'Assign Classes' : 'Assign Subjects'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default AssignClassSub;