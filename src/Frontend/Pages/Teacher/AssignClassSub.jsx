  import { useState } from 'react';
  import { Check, ChevronDown, School, BookOpen } from 'lucide-react';

  const AssignClassSub = () => {
    const [teacherId, setTeacherId] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry'];

    const handleTeacherIdChange = (e) => {
      setTeacherId(e.target.value);
    };

    const toggleClass = (className) => {
      setSelectedClasses(prev => 
        prev.includes(className) 
          ? prev.filter(c => c !== className)
          : [...prev, className]
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
      try {
        await fetch(`${process.env.VITE_APP_BASE_URL}/teacher/${teacherId}/assign-subjects`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subjects: selectedSubjects
          })
        });
      
        await fetch(`${process.env.VITE_APP_BASE_URL}/teacher/${teacherId}/assign-classes`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            classes: selectedClasses
          })
        });

        alert('Successfully assigned classes and subjects');
        setTeacherId('');
        setSelectedClasses([]);
        setSelectedSubjects([]);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to assign classes and subjects');
      }
    };

    return (
      <div className="min-h-screen  p-6 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Assign Classes and Subjects</h1>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={teacherId}
                onChange={handleTeacherIdChange}
                className="w-full px-3 py-2 text-gray-600 border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                placeholder="Teacher ID"
                id="teacherId"
                required
              />
              <label htmlFor="teacherId" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm">
                <span className="text-red-500">*</span>Teacher ID
              </label>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 text-gray-600 ">
              <div className="relative flex-1 ">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Classes
                </label>
                <button
                  type="button"
                  onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 border rounded-md bg-white"
                >
                  <div className="flex items-center">
                    <School className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{selectedClasses.length ? `${selectedClasses.length} classes selected` : 'Select classes'}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-purple-500" />
                </button>
              
                {isClassDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {classes.map((className) => (
                      <div
                        key={className}
                        onClick={() => toggleClass(className)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${selectedClasses.includes(className) ? 'bg-purple-500 border-blue-500' : 'border-gray-300'}`}>
                          {selectedClasses.includes(className) && <Check className="w-3 h-3 text-gray-600" />}
                        </div>
                        {className}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1 ">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Subjects
                </label>
                <button
                  type="button"
                  onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 border rounded-md bg-white"
                >
                  <div className="flex items-center ">
                    <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{selectedSubjects.length ? `${selectedSubjects.length} subjects selected` : 'Select subjects'}</span>
                  </div>
                  <ChevronDown className="w-5 h-5  text-purple-500" />
                </button>
              
                {isSubjectDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {subjects.map((subject) => (
                      <div
                        key={subject}
                        onClick={() => toggleSubject(subject)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${selectedSubjects.includes(subject) ? 'bg-purple-500 border-blue-500' : 'border-gray-300'}`}>
                          {selectedSubjects.includes(subject) && <Check className="w-3 h-3 text-gray-600" />}
                        </div>
                        {subject}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full border-2 border-purple-500 cursor-pointer text-purple-500 py-2 px-4 rounded-md transition duration-200"
            >
              Assign Classes and Subjects
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default AssignClassSub;