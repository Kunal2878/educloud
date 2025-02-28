import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
const UploadTimeTable = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const dispatch = useDispatch();
  const user =  useSelector((state) => state.userData.user);
  const url=  import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${url}/api/v1/class/all-classes`);
        const result = await response.json();
        if (result.statusCode === 200) {
          setClasses(result.data.classes);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('timeTable', data.timeTable[0])
    formData.append('className', data.className)

    const selectedClass = classes.find(c => c.className === data.className);
    if (!selectedClass) {
      alert('Invalid class name');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${url}/api/v1/class/${selectedClass._id}/upload-timetable`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        alert('Time table uploaded successfully')
      } else {
        alert('Failed to upload time table')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error uploading time table')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 sm:p-6 lg:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold mb-12 mt-4 text-gray-800"><span className="text-purpleColor">Upload</span> Time Table</h2>
        
        <div className="relative mb-10">
          <input
            {...register('className', { required: true })}
            className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
            placeholder="Class Name"
            id="className"
          />
          <label htmlFor="className" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm">
            <span className="text-red-500">*</span>Class Name <span className='text-gray-400'>(eg.1A)</span>
          </label>
        </div>

        <div className="mb-10">
          <div className="relative flex justify-start">
            <label htmlFor="timeTable" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-purple-500 text-purple-500 rounded-full hover:bg-purple-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload File
            </label>
            <input
              type="file"
              accept=".pdf"
              {...register('timeTable', { 
                required: true,
                validate: {
                  lessThan5MB: (files) => !files[0] || files[0].size <= 5000000 || 'File size must be less than 5MB',
                }
              })}
              className="hidden"
              id="timeTable"
              onChange={(e) => {
                if (e.target.files[0]?.size > 5000000) {
                  e.target.value = ''
                  alert('File size must be less than 5MB')
                }
              }}
            />
            <span className="ml-3 text-sm text-gray-500">Max size: 5MB</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mb-10 px-4 py-2 border border-purple-500 bg-white text-purple-500 rounded-lg hover:bg-purple-400 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
              Uploading...
            </div>
          ) : (
            'Upload Time Table'
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadTimeTable