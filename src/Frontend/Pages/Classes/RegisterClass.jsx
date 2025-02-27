import { useForm } from 'react-hook-form'
import { useState } from 'react'

const RegisterClass = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [students, setStudents] = useState([{ name: '', email: '' }])
  const [loading, setLoading] = useState(false)
  const url = import.meta.env.VITE_API_BASE_URL;
  const addStudent = () => {
    setStudents([...students, { name: '', email: '' }])
  }

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students]
    updatedStudents[index][field] = value
    setStudents(updatedStudents)
  }

  const handleDeleteStudent = () => {
    if (students.length > 1) {
      setStudents(students.slice(0, -1))
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('timeTable', data.timeTable[0])

    const classData = {
      className: data.className,
      section: data.section,
      classTeacher: {
        email: data.teacherEmail,
        name: data.teacherName
      },
      students: students.filter(student => student.name && student.email),
    }

    try {
      const response = await fetch(`${url}/api/v1/class/register`, {
        method: 'POST',
        body: formData
      })

      const timeTableUrl = await response.json()

      const finalResponse = await fetch('your-class-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...classData,
          timeTable: timeTableUrl
        })
      })

      if (finalResponse.ok) {
        // Handle success
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen  p-6 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold mb-12 mt-4 text-gray-800"><span className="text-purpleColor">Register</span> New Class</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2   gap-10 mb-6">
          <div className="relative">
            <input
              {...register('className', { required: true })}
              className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight  border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              placeholder="Class Name"
              id="className"
            />
            <label htmlFor="className" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"><span className="text-red-500">*</span>Class Name <span className='text-gray-400'>(eg.1A)</span></label>
          </div>
          <div className="relative">
            <input
              {...register('section', { required: true })}
              className="w-full px-3 py-2  bg-primary-300 text-black-300 border-lamaSkyLight border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
              placeholder="Section"
              id="section"
            />
            <label htmlFor="section" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"><span className="text-red-500">*</span>Section <span className='text-gray-400'>(eg.A)</span></label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Class Teacher Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2   gap-10">
            <div className="relative">
              <input
                {...register('teacherName', { required: true })}
                className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight  border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                placeholder="Teacher Name"
                id="teacherName"
              />
              <label htmlFor="teacherName" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"><span className="text-red-500">*</span>Teacher Name</label>
            </div>
            <div className="relative">
              <input
                {...register('teacherEmail', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight  border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                placeholder="Teacher Email"
                id="teacherEmail"
              />
              <label htmlFor="teacherEmail" className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm"><span className="text-red-500">*</span>Teacher Email</label>
            </div>
          </div>
        </div>

      <div className="mb-6 gap-12">
          <h3 className="text-lg font-semibold mb-3">Students</h3>
          {students.map((student, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2   gap-12 mb-16">
              <div className="relative gap-12">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={student.name}
                  onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight  border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                  id={`studentName${index}`}
                />
                <label htmlFor={`studentName${index}`} className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm">Student Name</label>
              </div>
              <div className="relative gap-8">
                <input
                  type="email"
                  placeholder="Student Email"
                  value={student.email}
                  onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-300 text-black-300 border-lamaSkyLight  border-b rounded-md focus:outline-none shadow-md transition-all peer placeholder-transparent"
                  id={`studentEmail${index}`}
                />
                <label htmlFor={`studentEmail${index}`} className="absolute left-3 -top-5 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm">Student Email</label>
              </div>
            </div>
          ))}
          <div className="flex gap-8 mt-4 mb-16 align-center justify-center ">
            <button
              type="button"
              onClick={addStudent}
              className="px-4 py-2 bg-white border-2 text-purple-500 border-purple-500 rounded-full hover:bg-gray-300 transition-all"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleDeleteStudent}
              className="px-4 py-2 bg-white border-2 text-red-500 border-red-500 rounded-full hover:bg-gray-300 transition-all"
            >
              -
            </button>
          </div>        </div>

        {/* <div className="mb-10">
          <div className="relative flex  justify-start ">
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
            <label htmlFor="timeTable" className="absolute left-3 -top-5 text-sm font-medium text-gray-700"><span className="text-red-500">*</span>Upload Time Table (Max 5MB)</label>
          </div>
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mb-10 px-4 py-2 border border-purple-500 bg-white text-purple-500 rounded-lg hover:bg-purple-400 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
              Registering...
            </div>
          ) : (
            'Register Class'
          )}
        </button>
      </form>
    </div>
  )}

export default RegisterClass