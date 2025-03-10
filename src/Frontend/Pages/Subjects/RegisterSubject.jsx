import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from "js-cookie"
import { School,ArrowRight, User, ChevronDown, Check,School2 } from 'lucide-react'
import {CreateSubject, GetAllClass, GetAllTeacher } from '../../Route'
import Toast from '../../Components/Toast'
const RegisterSubjects = () => {
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastIcon, setToastIcon] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/${GetAllClass}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.data.statusCode === 200) {
          setClasses(response.data.data.classes);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/${GetAllTeacher}`)
        setTeachers(response.data.data.teachers)
      } catch (error) {
        console.error('Error fetching teachers:', error)
      }
    }
    fetchTeachers()
  }, [])

  const handleTeacherSelect = (e) => {
    setSelectedTeacher(e.target.value)
  }

  const handleClassSelect = (e) => {
    setSelectedClass(e.target.value)
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const syllabusArray = data.syllabus.split(',').map(item => item.trim())
      
      const selectedClassItem = classes.find(classItem => classItem.className === selectedClass)
      const classId = selectedClassItem ? selectedClassItem._id : null

      if (!classId) {
        setToastMessage("Class ID not found")
        setToastIcon("wrong")
        setShowToast(true)
        setLoading(false)
        return
      }

      const requestBody = {
        name: data.name,
        class: classId,
        teacher: selectedTeacher,
        syllabus: syllabusArray
      }

          const response = await axios.post(`${url}/api/v1/subject/register`, requestBody, {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          })      
      if (response.status === 201 || response.status === 200 ||  response.status === 204) {
        setToastMessage('Subject registered successfully!')
        setToastIcon("right")
        setShowToast(true)
        reset();
        setSelectedTeacher('');
        setSelectedClass('');
      }
    } 
    catch (error) {
      console.error('Error registering subject:', error)
      setToastMessage('Failed to register subject')
      setToastIcon("wrong")
      setShowToast(true)
    } 
    
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="min-h-full max-w-3xl flex items-center justify-center p-4">
        {showToast && <div className="fixed"><Toast message={toastMessage} iconName={toastIcon} /></div>}
        <div className="h-full w-full space-y-12 bg-white">
          <div className="text-left">
            <h2 className="h2 text-black mb-10 text-left">
              Register New Subject
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="mb-6 w-full">
              <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
                <input
                  {...register('name', { required: true })}
                  className="w-full px-2 py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-lg transition-all peer placeholder-transparent"
                  placeholder="Subject Name"
                  id="name"
                />
                <label htmlFor="name" className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm">
                  <span className="text-danger">
                    <School2 size={20} />
                  </span>
                  Subject Name
                </label>
              </div>
            </div>

            <div className="mb-6 w-full">
              <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
                <button
                  type="button"
                  onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
                  className="w-full flex items-center justify-between px-2 py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-lg text-sm md:text-base"
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-danger" />
                    <span className="text-black">
                      {selectedTeacher ? teachers.find(t => t._id === selectedTeacher)?.name : "Select teacher"}
                    </span>
                  </div>
                  <ChevronDown size={24} className="text-black" />
                </button>
                {isTeacherDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {teachers.map((teacher) => (
                      <div
                        key={teacher._id}
                        onClick={() => {
                          handleTeacherSelect({ target: { value: teacher._id }})
                          setIsTeacherDropdownOpen(false)
                        }}
                        className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                      >
                        <div
                          className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                            selectedTeacher === teacher._id
                              ? "bg-purple-500 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedTeacher === teacher._id && (
                            <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />
                          )}
                        </div>
                        {teacher.name} - {teacher.email}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6 w-full">
              <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
                <button
                  type="button"
                  onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                  className="w-full flex items-center justify-between px-2 py-2 bg-transparent border-2 border-black-200 text-gray-600 focus:outline rounded-lg text-sm md:text-base"
                >
                  <div className="flex items-center">
                    <School className="w-4 h-4 md:w-5 md:h-5 mr-2 text-danger" />
                    <span className="text-black">
                      {selectedClass ? classes.find(c => c.className === selectedClass)?.className : "Select Class"}
                    </span>
                  </div>
                  <ChevronDown size={24} className="text-black" />
                </button>
                {isClassDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {classes.map((classItem) => (
                      <div
                        key={classItem._id}
                        onClick={() => {
                          handleClassSelect({ target: { value: classItem.className }})
                          setIsClassDropdownOpen(false)
                        }}
                        className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm md:text-base"
                      >
                        <div
                          className={`w-3 h-3 md:w-4 md:h-4 border rounded mr-2 flex items-center justify-center ${
                            selectedClass === classItem.className
                              ? "bg-purple-500 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedClass === classItem.className && (
                            <Check className="w-2 h-2 md:w-3 md:h-3 text-gray-600" />
                          )}
                        </div>
                        {classItem.className}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6 w-full">
              <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
                <textarea
                  {...register('syllabus', { required: true })}
                  className="w-full h-32 p-2 border-2 rounded bg-transparent border-black-200 focus:outline focus:outline-2 focus:outline-primaryBlue text-gray-600 resize-none"
                  placeholder="Enter syllabus topics"
                  id="syllabus"
                  rows="4"
                />
                <label htmlFor="syllabus" className="absolute left-2 -top-6 text-sm flex items-center gap-2 font-medium text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm">
                  <span className="text-danger">
                    <School2 size={20} />
                  </span>
                  Syllabus Topics <span className='text-gray-400'>(separated by commas)</span>
                </label>
              </div>
            </div>

            <div className="relative w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Register
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RegisterSubjects