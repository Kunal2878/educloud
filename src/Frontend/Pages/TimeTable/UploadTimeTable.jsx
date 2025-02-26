import { useForm } from 'react-hook-form'
import { useState } from 'react'

const UploadTimeTable = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('timeTable', data.timeTable[0])
    formData.append('className', data.className)

    try {
      const response = await fetch(`https://school-backend-ocze.onrender.com/api/v1/class/67adcc2db9b56ef6a16fc903/upload-timetable`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Handle success
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
            <input
              type="file"
              accept=".pdf"
              {...register('timeTable', { 
                required: true,
                validate: {
                  lessThan5MB: (files) => !files[0] || files[0].size <= 5000000 || 'File size must be less than 5MB',
                }
              })}
              className="w-3/4 lg:w-1/4 px-3 py-2 mt-4 border-b text-gray-600 rounded-md focus:outline-none shadow-md transition-all peer"
              id="timeTable"
              onChange={(e) => {
                if (e.target.files[0]?.size > 5000000) {
                  e.target.value = ''
                  alert('File size must be less than 5MB')
                }
              }}
            />
            <label htmlFor="timeTable" className="absolute left-3 -top-5 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Upload Time Table (Max 5MB)
            </label>
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