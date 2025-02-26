import { useState } from 'react'
import { useForm } from 'react-hook-form'

const RegisterSubjects = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const url = import.meta.env.VITE_API_BASE_URL;
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const syllabusArray = data.syllabus.split(',').map(item => item.trim())
      
      const requestBody = {
        name: data.name,
        class: data.className,
        teacher: data.teacherName,
        students: [],
        syllabus: syllabusArray
      }

      const response = await fetch(`${url}/api/v1/subject/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })
      
      if (response.status === 201) {
        alert('Subject registered successfully!')
        reset(); // Reset form fields
      }
    } catch (error) {
      console.error('Error registering subject:', error)
      alert('Failed to register subject')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-10 text-black text-center "><span className="text-purpleColor">Register <span/></span> New Subject</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full flex flex-col items-center">
        <div className="mb-6 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full px-3 py-2 mb-4 border-b bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all"
              id="name"
            />
            <label htmlFor="name" className="absolute left-3 -top-5 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Subject Name
            </label>
          </div>
        </div>

        <div className="mb-6 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              {...register('teacherName', { required: true })}
              className="w-full px-3 py-2 mb-4 border-b bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all"
              id="teacherName"
            />
            <label htmlFor="teacherName" className="absolute left-3 -top-5 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Teacher Name
            </label>
          </div>
        </div>

        <div className="mb-6 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              {...register('className', { required: true })}
              className="w-full px-3 py-2 mb-4 border-b bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all"
              id="className"
            />
            <label htmlFor="className" className="absolute left-3 -top-5 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Class Name
            </label>
          </div>
        </div>

        <div className="mb-6 w-full max-w-md">
          <div className="relative">
            <textarea
              {...register('syllabus', { required: true })}
              className="w-full px-3 py-2 mb-4 border-b bg-primary-300 text-black-300 border-lamaSkyLight rounded-md focus:outline-none shadow-md transition-all"
              id="syllabus"
              placeholder="Enter syllabus topics separated by commas"
              rows="4"
            />
            <label htmlFor="syllabus" className="absolute left-3 -top-5 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Syllabus Topics
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full max-w-md mb-10 px-4 py-2 border border-purple-500 bg-white text-purple-500 rounded-lg hover:bg-purple-400 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
              Registering...
            </div>
          ) : (
            'Register Subject'
          )}
        </button>
      </form>
    </div>
  )
}

export default RegisterSubjects