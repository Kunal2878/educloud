  import { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import Cookies from "js-cookie";
  import {
    User, ArrowRight, Phone, School2
  } from "lucide-react";
  import Toast from "../../Components/Toast";
  import axios from "axios";
  import { GetAllClass, GetSubjectByClass,UpdateStudent } from "../../Route";
  import { useSelector, useDispatch } from "react-redux";
  import Input from "../../Components/Elements/Input";
  import SelectDropdown from "../../Components/Elements/SelectDropdown";

  const UpdateStudents = (StudentData) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        name: StudentData.name,
        parentName: StudentData.parentName,
        parentContact: StudentData.parentContact,
        section: StudentData.section,
      }
    });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastIcon, setToastIcon] = useState("");
    const [classData, setClassData] = useState([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const url = import.meta.env.VITE_API_BASE_URL;
    const token = Cookies.get("token");

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}${GetAllClass}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassData(response.data.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setToastMessage("Error fetching classes");
        setToastIcon("wrong");
        setShowToast(true);
      }
    };

    const fetchSubjects = async (classId) => {
      
      try {
        const response = await axios.get(`${url}${GetSubjectByClass}/${classId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        setSubjectsData(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setToastMessage("Error fetching subjects");
        setToastIcon("wrong");
        setShowToast(true);
      }
    };

    useEffect(() => {
      fetchClasses();
    }, []);

    useEffect(() => {
      if (selectedClass) {
        fetchSubjects(selectedClass);
      }
    }, [selectedClass]);
    
    const onSubmit = async (data) => {
      const studentData = {
        name: data.name,
        studentClass: selectedClass,
        section: data.section,
        grade: data.grade,
        subjects: selectedSubjects,
        parentContact: data.parentContact,
        parentName: data.parentName
      };
      setLoading(true);
      try {
        const response = await axios.put(
          `${url}${UpdateStudent}/${StudentData.studentData._id}`,
          studentData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setToastMessage("Student updated successfully");
          setToastIcon("right");
          setShowToast(true);
          reset();
          setSelectedClass("");
          setSelectedSection("");
          setSelectedGrade("");
          setSelectedSubjects([]);
        } else {
          setToastMessage("Update failed");
          setToastIcon("wrong");
          setShowToast(true);
        }
      } catch (error) {
        console.error(error);
        setToastMessage(error.response.data.message);
        setToastIcon("wrong");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    // console.log(StudentData.studentData._id)
    return (
      <div className="min-h-full max-w-3xl flex items-center justify-center p-6">
        {showToast && (
          <div className="fixed">
            <Toast message={toastMessage} iconName={toastIcon} />
          </div>
        )}
        <div className="h-full w-full space-y-12 bg-white">
          <div className="text-left">
            <h2 className="h2 text-black mt-5 flex flex-col items-start">
              Update Student
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-8 mb-4"
          >
            <Input
              id="name"
              name="name"
              label="Student Name"
              register={register}
              errors={errors}
              required="Name is required"
              placeholder="Full Name"
              icon={User}
              className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
            />
          
            <Input
              id="parentName"
              name="parentName"
              label="Parent Name"
              register={register}
              errors={errors}
              required="Parent name is required"
              placeholder="Parent Name"
              icon={User}
              className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
            />
          
            <Input
              id="parentContact"
              name="parentContact"
              label="Parent Contact"
              register={register}
              errors={errors}
              required="Parent contact is required"
              type="text"
              placeholder="Parent Contact"
              icon={Phone}
              validation={{
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid contact number",
                },
              }}
              className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
            />
          
            <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <SelectDropdown
                options={classData || []}
                selectedValue={selectedClass}
                onSelect={setSelectedClass}
                displayField="className"
                valueField="_id"
                placeholder="Select Class"
                icon={<School2 size={20} />}
                required={true}
              />
            </div>

            <Input
              id="section"
              name="section"
              label="Section"
              register={register}
              errors={errors}
              required="Section is required"
              placeholder="Enter Section"
              icon={School2}
              className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
            />

            <Input
              id="grade"
              name="grade"
              label="Grade"
              register={register}
              errors={errors}
              required="Grade is required"
              placeholder="Enter Grade"
              icon={School2}
              className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto"
            />

            <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <SelectDropdown
                options={subjectsData || []}
                selectedValue={selectedSubjects}
                onSelect={(selected) => setSelectedSubjects(Array.isArray(selected) ? selected : [selected])}
                displayField="name"
                valueField="_id"
                placeholder="Select Subjects"
                icon={<School2 size={20} />}
                required={true}
                multiple={true}
              />
            </div>
          
            <div className="w-full sm:w-96 md:w-[24rem] lg:w-[28rem] mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-success-500 text-white focus:outline-none hover:scale-105 transition duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Update
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );  };

  export default UpdateStudents;