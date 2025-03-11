import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GetAllClass } from "../../Route";
import { toPng } from "dom-to-image";
import { jsPDF } from "jspdf";

const IDCardGenerator = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const idCardRef = useRef(null);
  const url = import.meta.env.VITE_API_BASE_URL;

  // Background image path - replace with actual path to your ID card template
  const bgImagePath = "/IDCard.png"; // Update this path

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}${GetAllClass}`);
      setClasses(response.data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setMessage("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://school-backend-ocze.onrender.com/api/v1/student/getstudentbyclassid/${classId}`
      );
      setStudents(response.data.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleCheckboxChange = (student) => {
    setSelectedStudents((prev) => {
      const isSelected = prev.some((s) => s._id === student._id);
      if (isSelected) {
        return prev.filter((s) => s._id !== student._id);
      } else {
        return [...prev, student];
      }
    });
  };

  const generateIDCard = async (student) => {
    try {
      // Create a temporary container to render the ID card
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);
      
      // Create ID card element with background image
      const idCardElement = document.createElement('div');
      idCardElement.style.width = '350px';
      idCardElement.style.height = '600px';
      idCardElement.style.backgroundImage = `url(${bgImagePath})`;
      idCardElement.style.backgroundSize = 'cover';
      idCardElement.style.backgroundPosition = 'center';
      idCardElement.style.position = 'relative';
      idCardElement.style.fontFamily = 'Arial, sans-serif';
      
      // Profile picture
      const profileDiv = document.createElement('div');
      profileDiv.style.position = 'absolute';
      profileDiv.style.left = '50%';
      profileDiv.style.transform = 'translateX(-50%)';
      profileDiv.style.top = '175px';
      profileDiv.style.width = '128px';
      profileDiv.style.height = '128px';
      profileDiv.style.borderRadius = '50%';
      profileDiv.style.overflow = 'hidden';
      
      const profileImg = document.createElement('img');
      profileImg.src = student.profilePicture || "/api/placeholder/128/128";
      profileImg.alt = "Student Profile";
      profileImg.style.width = '100%';
      profileImg.style.height = '100%';
      profileImg.style.objectFit = 'cover';
      
      profileDiv.appendChild(profileImg);
      idCardElement.appendChild(profileDiv);
      
      // Student Name
      const nameDiv = document.createElement('div');
      nameDiv.style.position = 'absolute';
      nameDiv.style.left = '0';
      nameDiv.style.width = '100%';
      nameDiv.style.top = '330px';
      nameDiv.style.textAlign = 'center';
      nameDiv.style.fontWeight = 'bold';
      nameDiv.style.fontSize = '28px';
      nameDiv.style.textTransform = 'uppercase';
      nameDiv.textContent = student.name;
      idCardElement.appendChild(nameDiv);
      
      // Role (STUDENT)
      const roleDiv = document.createElement('div');
      roleDiv.style.position = 'absolute';
      roleDiv.style.left = '0';
      roleDiv.style.width = '100%';
      roleDiv.style.top = '375px';
      roleDiv.style.textAlign = 'center';
      roleDiv.style.fontSize = '18px';
      roleDiv.style.textTransform = 'uppercase';
      roleDiv.textContent = 'STUDENT';
      idCardElement.appendChild(roleDiv);
      
      // Admission Number
      const admissionDiv = document.createElement('div');
      admissionDiv.style.position = 'absolute';
      admissionDiv.style.left = '30px';
      admissionDiv.style.right = '30px';
      admissionDiv.style.top = '430px';
      admissionDiv.style.fontSize = '16px';
      
      const admissionLabel = document.createElement('span');
      admissionLabel.style.fontWeight = 'bold';
      admissionLabel.style.display = 'inline-block';
      admissionLabel.style.width = '150px';
      admissionLabel.textContent = 'Admission No';
      
      const admissionValue = document.createElement('span');
      admissionValue.textContent = `: ${student.rollNumber || "N/A"}`;
      
      admissionDiv.appendChild(admissionLabel);
      admissionDiv.appendChild(admissionValue);
      idCardElement.appendChild(admissionDiv);
      
      // Email
      const emailDiv = document.createElement('div');
      emailDiv.style.position = 'absolute';
      emailDiv.style.left = '30px';
      emailDiv.style.right = '30px';
      emailDiv.style.top = '470px';
      emailDiv.style.fontSize = '16px';
      
      const emailLabel = document.createElement('span');
      emailLabel.style.fontWeight = 'bold';
      emailLabel.style.display = 'inline-block';
      emailLabel.style.width = '150px';
      emailLabel.textContent = 'E-mail';
      
      const emailValue = document.createElement('span');
      emailValue.textContent = `: ${student.email || "N/A"}`;
      
      emailDiv.appendChild(emailLabel);
      emailDiv.appendChild(emailValue);
      idCardElement.appendChild(emailDiv);
      
      // Phone
      const phoneDiv = document.createElement('div');
      phoneDiv.style.position = 'absolute';
      phoneDiv.style.left = '30px';
      phoneDiv.style.right = '30px';
      phoneDiv.style.top = '510px';
      phoneDiv.style.fontSize = '16px';
      
      const phoneLabel = document.createElement('span');
      phoneLabel.style.fontWeight = 'bold';
      phoneLabel.style.display = 'inline-block';
      phoneLabel.style.width = '150px';
      phoneLabel.textContent = 'Phone';
      
      const phoneValue = document.createElement('span');
      phoneValue.textContent = `: ${student.phone || "N/A"}`;
      
      phoneDiv.appendChild(phoneLabel);
      phoneDiv.appendChild(phoneValue);
      idCardElement.appendChild(phoneDiv);
      
      // Append to temporary container
      tempContainer.appendChild(idCardElement);
      
      // Convert to image
      const dataUrl = await toPng(idCardElement);
      
      // For debugging - display the generated PNG in a new window
      const newWindow = window.open();
      newWindow.document.write(`<img src="${dataUrl}" alt="ID Card Preview"/>`);
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [105, 148] // ID card size
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, 105, 148);
      
      // Open in a new window for download
      window.open(URL.createObjectURL(pdf.output('blob')));
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      setMessage(`ID Card for ${student.name} generated successfully`);
    } catch (error) {
      console.error("Error generating ID card:", error);
      setMessage("Failed to generate ID card");
    }
  };

  const generateMultipleIDCards = async () => {
    if (selectedStudents.length === 0) {
      setMessage("Please select at least one student");
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [105, 148]
      });

      for (let i = 0; i < selectedStudents.length; i++) {
        const student = selectedStudents[i];
        
        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        document.body.appendChild(tempContainer);
        
        // Create ID card with background image
        const idCardElement = document.createElement('div');
        idCardElement.style.width = '350px';
        idCardElement.style.height = '600px';
        idCardElement.style.backgroundImage = `url(${bgImagePath})`;
        idCardElement.style.backgroundSize = 'cover';
        idCardElement.style.backgroundPosition = 'center';
        idCardElement.style.position = 'relative';
        idCardElement.style.fontFamily = 'Arial, sans-serif';
        
        // Profile picture
        const profileDiv = document.createElement('div');
        profileDiv.style.position = 'absolute';
        profileDiv.style.left = '50%';
        profileDiv.style.transform = 'translateX(-50%)';
        profileDiv.style.top = '175px';
        profileDiv.style.width = '128px';
        profileDiv.style.height = '128px';
        profileDiv.style.borderRadius = '50%';
        profileDiv.style.overflow = 'hidden';
        
        const profileImg = document.createElement('img');
        profileImg.src = student.profilePicture || "/api/placeholder/128/128";
        profileImg.alt = "Student Profile";
        profileImg.style.width = '100%';
        profileImg.style.height = '100%';
        profileImg.style.objectFit = 'cover';
        
        profileDiv.appendChild(profileImg);
        idCardElement.appendChild(profileDiv);
        
        // Student Name
        const nameDiv = document.createElement('div');
        nameDiv.style.position = 'absolute';
        nameDiv.style.left = '0';
        nameDiv.style.width = '100%';
        nameDiv.style.top = '330px';
        nameDiv.style.textAlign = 'center';
        nameDiv.style.fontWeight = 'bold';
        nameDiv.style.fontSize = '28px';
        nameDiv.style.textTransform = 'uppercase';
        nameDiv.textContent = student.name;
        idCardElement.appendChild(nameDiv);
        
        // Role (STUDENT)
        const roleDiv = document.createElement('div');
        roleDiv.style.position = 'absolute';
        roleDiv.style.left = '0';
        roleDiv.style.width = '100%';
        roleDiv.style.top = '375px';
        roleDiv.style.textAlign = 'center';
        roleDiv.style.fontSize = '18px';
        roleDiv.style.textTransform = 'uppercase';
        roleDiv.textContent = 'STUDENT';
        idCardElement.appendChild(roleDiv);
        
        // Admission Number
        const admissionDiv = document.createElement('div');
        admissionDiv.style.position = 'absolute';
        admissionDiv.style.left = '30px';
        admissionDiv.style.right = '30px';
        admissionDiv.style.top = '430px';
        admissionDiv.style.fontSize = '16px';
        
        const admissionLabel = document.createElement('span');
        admissionLabel.style.fontWeight = 'bold';
        admissionLabel.style.display = 'inline-block';
        admissionLabel.style.width = '150px';
        admissionLabel.textContent = 'Admission No';
        
        const admissionValue = document.createElement('span');
        admissionValue.textContent = `: ${student.rollNumber || "N/A"}`;
        
        admissionDiv.appendChild(admissionLabel);
        admissionDiv.appendChild(admissionValue);
        idCardElement.appendChild(admissionDiv);
        
        // Email
        const emailDiv = document.createElement('div');
        emailDiv.style.position = 'absolute';
        emailDiv.style.left = '30px';
        emailDiv.style.right = '30px';
        emailDiv.style.top = '470px';
        emailDiv.style.fontSize = '16px';
        
        const emailLabel = document.createElement('span');
        emailLabel.style.fontWeight = 'bold';
        emailLabel.style.display = 'inline-block';
        emailLabel.style.width = '150px';
        emailLabel.textContent = 'E-mail';
        
        const emailValue = document.createElement('span');
        emailValue.textContent = `: ${student.email || "N/A"}`;
        
        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailValue);
        idCardElement.appendChild(emailDiv);
        
        // Phone
        const phoneDiv = document.createElement('div');
        phoneDiv.style.position = 'absolute';
        phoneDiv.style.left = '30px';
        phoneDiv.style.right = '30px';
        phoneDiv.style.top = '510px';
        phoneDiv.style.fontSize = '16px';
        
        const phoneLabel = document.createElement('span');
        phoneLabel.style.fontWeight = 'bold';
        phoneLabel.style.display = 'inline-block';
        phoneLabel.style.width = '150px';
        phoneLabel.textContent = 'Phone';
        
        const phoneValue = document.createElement('span');
        phoneValue.textContent = `: ${student.phone || "N/A"}`;
        
        phoneDiv.appendChild(phoneLabel);
        phoneDiv.appendChild(phoneValue);
        idCardElement.appendChild(phoneDiv);
        
        // Append to temporary container
        tempContainer.appendChild(idCardElement);
        
        // Convert to image
        const dataUrl = await toPng(idCardElement);
        
        // Add new page for each student except the first one
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, 105, 148);
        
        // Clean up
        document.body.removeChild(tempContainer);
      }
      
      // Open in a new window for download
      window.open(URL.createObjectURL(pdf.output('blob')));
      
      setMessage(`Generated ${selectedStudents.length} ID cards successfully`);
    } catch (error) {
      console.error("Error generating multiple ID cards:", error);
      setMessage("Failed to generate ID cards");
    }
  };

  return (
    <div className="sm:px-16 px-6 sm:py-16 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row text-black justify-between items-start md:items-center mb-6 p-2">
        <div className="mb-4 md:mb-0">
          <h2 className="h2 text-2xl font-semibold mb-2">ID Card Generator</h2>
          <div className="flex items-center text-sm subtitle-2">
            <span className="mr-2">Students /</span>
            <span>ID Cards</span>
          </div>
        </div>
        <div>
          {selectedStudents.length > 0 && (
            <button
              onClick={generateMultipleIDCards}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Selected ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {message}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-lg m-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 rounded-lg text-xs outline-none bg-primary-300 text-black-300 border-lamaSkyLight"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className} {cls.section ? `- ${cls.section}` : ""}
              </option>
            ))}
          </select>
        </div>

        {selectedClass && (
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-4">Student List</h2>

            <div className="overflow-x-auto text-black-300 text-base bg-white m-4">
              <table className="w-full min-w-[768px] pb-10">
                <thead className="">
                  <tr className="border-b bg-lamaPurpleLight">
                    <th className="px-6 py-4 text-left">Select</th>
                    <th className="px-6 py-4 text-left">#</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Roll Number</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-left">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr
                        key={student._id}
                        className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
                      >
                        <td className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300"
                            checked={selectedStudents.some(s => s._id === student._id)}
                            onChange={() => handleCheckboxChange(student)}
                          />
                        </td>
                        <td className="px-6 py-4 text-left">{index + 1}</td>
                        <td className="px-6 py-4 text-left">
                          {student.email || "-"}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {student.rollNumber || "-"}
                        </td>
                        <td className="px-6 py-4 text-left">{student.name}</td>
                        <td className="px-6 py-4 text-left">
                          <button 
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => generateIDCard(student)}
                          >
                            Generate
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDCardGenerator;