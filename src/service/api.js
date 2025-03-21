import axios from "axios";

import {
    SignupPrincipal, LoginPrincipal, SignupTeacher, LoginTeacher, GetAllTeacher, MarkTeacherAttendance,
    GetTeacherAttendance, SignupStudent,LoginStudent,GetAllStudent,CreateClass,
    GetAllClass, CreateSubject, GetAllSubject, CreateExam, GetAllExams, UploadExamTimeTable, CreateEvent, DeleteEvent,
    CreateAnnouncement,DeleteAnnouncement,CreateComplaint,GetAllComplaints,
    DeleteComplaint, GetAllEvents, GetAllAnnouncements,GetStudentByClass,
    GetStudentByID,GetAllStudentCount,GetAllTeacherCount, GetLeaderBoard,GetTeacherByID,
    GetSubjectByClass,AddMarkStudent, AddTransaction, GetTransactionsByTeacher, UpdateStudent, GetStudentAttendanceByID
  } from '../Frontend/Route';

export const LoginUser = async (url, payload, role) => {
  try {
    let endpoint = `${url}${LoginPrincipal}`;
    if (role === "student") {
      endpoint = `${url}${LoginStudent}`;
    } else if (role === "teacher") {
      endpoint = `${url}${LoginTeacher}`;
    }
    console.log(endpoint)
    const response = await axios.post(endpoint, payload);
  

    const responseData = response.data;
     
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: {
          token: role === "student" ? responseData.data.accessToken : responseData.token,
          user: role === "student" 
            ? responseData.data.student 
            : role === "teacher"
            ? responseData.teacher
            : responseData.user
        },
        message: "Login successful!"
      };
    } 
    else {
      return {
        status: response.status,
        data: null,
        message: "Login failed. Please try again."
      };
    }
  } catch (err) {
    console.log(err)
    return {
      status: 400,
      data: null,
      message: "Email or password is incorrect. Please try again."
    };
  }
};  

export const RegisterPrincipalAccount = async (url, payload) => {
  try {
    const endpoint = `${url}${SignupPrincipal}`;
    const response = await axios.post(endpoint, payload);
    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Principal registration successful!"
      };
    } 
    
    else {
      return {
        status: response.status,
        data: null,
        message: "Registration failed. Please try again."
      };
    }
  } 
  catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: err.response?.status === 400 ? "Email already exists" : "Registration failed. Please check your information and try again."
    };
  }
};

export const RegisterTeacherAccount = async (url, token, payload) => {
  try {
    const endpoint = `${url}${SignupTeacher}`;
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Teacher registration successful!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Registration failed. Please try again."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: err.response?.status === 400 ? "Teacher already exists" : "Registration failed. Please check your information and try again."
    };
  }
};

export const RegisterStudent = async (url, payload) => {
  try {
    const endpoint = `${url}${SignupStudent}`;
    const response = await axios.post(endpoint, payload);
    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Student registration successful!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Registration failed. Please try again."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: err.response?.status === 400 ? "Email already exists" : "Registration failed. Please check your information and try again."
    };
  }
};

export const GetTeachersPages = async (url,currentpage) => {
  try {
    const endpoint = `${url}${GetAllTeacher}/?page=${currentpage}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Teachers fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch teachers."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch teachers."
    };
  }
};
export const GetTeachers = async (url) => {
  try {
    const endpoint = `${url}${GetAllTeacher}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Teachers fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch teachers."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch teachers."
    };
  }
};

export const GetAllTeacherCountAPI = async (url) => {
  try {
    const endpoint = `${url}${GetAllTeacherCount}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Teacher count fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch teacher count."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch teacher count."
    };
  }
};




export const MarkTeacherAttendanceAPI = async (url, payload) => {
  try {
    const endpoint = `${url}${MarkTeacherAttendance}`;
    const response = await axios.post(endpoint, payload);
    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Attendance marked successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to mark attendance."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to mark attendance."
    };
  }
};

export const GetTeacherByIDAPI = async (url,teacherID) => {
  try {
    const endpoint = `${url}${GetTeacherByID}/${teacherID}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
     
      return {
        status: response.status,
        data: response.data.data,
        message: "Teacher fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: response.data.data.message
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: err.response.status,
      data: null,
      message: err.response.data.message
    };
  }
};



export const GetTeacherAttendanceAPI = async (url) => {
  try {
    const endpoint = `${url}${GetTeacherAttendance}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Attendance records fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch attendance records."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch attendance records."
    };
  }
};

export const GetStudents = async (url,page) => {
  try {
    const endpoint = `${url}${GetAllStudent}/?page=${page}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
     
      return {
        status: response.status,
        data: response.data.data,
        message: "Students fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch students."
      };
    }
  } catch (err) {
    console.log(err)
    return {
      status: 400,
      data: null,
      message: "Failed to fetch students."
    };
  }
};

export const GetStudentByClassAPI = async (url,classId) => {
  try {
    const endpoint = `${url}${GetStudentByClass}/${classId}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
     
      return {
        status: response.status,
        data: response.data.data,
        message: "Students fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch students."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch students."
    };
  }
};
export const GetStudentByIDAPI = async (url,studentID) => {
  try {
    const endpoint = `${url}${GetStudentByID}/${studentID}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
     
      return {
        status: response.status,
        data: response.data.data,
        message: "Students fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch students."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch students."
    };
  }
};

export const GetAllStudentCountAPI = async (url) => {
  try {
    const endpoint = `${url}${GetAllStudentCount}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Student count fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch student count."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch student count."
    };
  }
};

export const GetStudentAttendanceByIDAPI = async (url, studentID) => {
  try {
    const endpoint = `${url}${GetStudentAttendanceByID}/${studentID}/attendance-history`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.attendanceHistory,
        message: "Student attendance fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch student attendance."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch student attendance."
    };
  }
};


export const GetLeaderBoardAPI = async (url, classID) => {
  try {
    const endpoint = `${url}${GetLeaderBoard}/${classID}`;
    console.log(endpoint)
    const response = await axios.get(endpoint);
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Leaderboard fetched successfully!"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch leaderboard."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch leaderboard."
    };
  }
};

export const AddMarkStudentAPI = async (url, payload, token) => {
  try {
    const endpoint = `${url}${AddMarkStudent}`;
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Student marks added successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      console.log(response.status)
      return {
        status: response.status,
        data: null,
        message: "Failed to add student marks."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to add student marks."
    };
  }
};





export const CreateClassAPI = async (url, payload,token) => {
  try {
    const endpoint = `${url}${CreateClass}`;
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });    
    if (response.status === 200 || response.status === 201  || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Class created successfully!"
      };
    } 
    else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    }
    else {
      return {
        status: response.status,
        data: null,
        message: "Failed to create class."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to create class."
    };
  }
};

export const GetClasses = async (url) => {
  try {
    const endpoint = `${url}${GetAllClass}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Classes fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch classes."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch classes."
    };
  }
};

export const CreateSubjectAPI = async (url, payload,token) => {
  try {
    const endpoint = `${url}${CreateSubject}`;
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Subject created successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to create subject."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to create subject."
    };
  }
};

export const GetSubjects = async (url) => {
  try {
    const endpoint = `${url}${GetAllSubject}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data,
        message: "Subjects fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch subjects."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch subjects."
    };
  }
};

export const GetSubjectByClassAPI = async (url, classId) => {
  try {
    const endpoint = `${url}${GetSubjectByClass}/${classId}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Subjects fetched successfully!"
      };
    } else {

      return {
        status: response.status,
        data: null,
        message: "Failed to fetch subjects."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch subjects."
    };
  }
};





export const CreateExamAPI = async (url, payload) => {
  try {
    const endpoint = `${url}${CreateExam}`;
    const response = await axios.post(endpoint, payload);
    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Exam created successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to create exam."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to create exam."
    };
  }
};

export const GetExamsAPI = async (url) => {
  try {
    const endpoint = `${url}${GetAllExams}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Exams fetched successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to fetch exams."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to fetch exams."
    };
  }
};

export const UploadExamTimeTableAPI = async (url, payload) => {
  try {
    const endpoint = `${url}${UploadExamTimeTable}`;
    const response = await axios.post(endpoint, payload);
    
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "Exam timetable uploaded successfully!"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to upload exam timetable."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to upload exam timetable."
    };
  }
};

export const CreateEventAPI = async (url, payload,token) => {
  try {
    const endpoint = `${url}${CreateEvent}`;
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Event created successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to create event."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to create event."
    };
  }
};
export const GetAllEventsAPI = async (url,token) => {
  try {
    const endpoint = `${url}${GetAllEvents}`;
      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Events retrieved successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to retrieve events."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to retrieve events."
    };
  }
};

export const DeleteEventAPI = async (url, eventId,token) => {
  console.log(eventId,token)
  try {
    const endpoint = `${url}${DeleteEvent}`;
    const response = await axios.delete(endpoint,eventId, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Event deleted successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to delete event."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to delete event."
    };
  }
};

export const CreateAnnouncementAPI = async (url, payload, token) => {
  try {
    const endpoint = `${url}${CreateAnnouncement}`;
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Announcement created successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to create announcement."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to create announcement."
    };
  }
};
export const GetAllAnnouncementsAPI = async (url, token) => {
  try {
    const endpoint = `${url}${GetAllAnnouncements}`;
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data.data,
        message: "Announcements retrieved successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to retrieve announcements."
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to retrieve announcements."
    };
  }
};

export const DeleteAnnouncementAPI = async (url, announcementId, token) => {
  try {
    const endpoint = `${url}${DeleteAnnouncement}/${announcementId}`;
    const response = await axios.delete(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
        message: "Announcement deleted successfully!"
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        data: null,
        message: "Invalid token"
      };
    } else {
      return {
        status: response.status,
        data: null,
        message: "Failed to delete announcement."
      };
    }
  } 
  catch (err) {
    console.log(err);
    return {
      status: 400,
      data: null,
      message: "Failed to delete announcement."
    };
  }}
  export const AddTransactionAPI = async (url, transactionData, token) => {
    try {
      const endpoint = `${url}${AddTransaction}`;
      const response = await axios.post(endpoint, transactionData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        return {
          status: response.status,
          data: response.data,
          message: "Transaction added successfully!"
        };
      } else if (response.status === 401) {
        return {
          status: response.status,
          data: null,
          message: "Invalid token"
        };
      } else {
        return {
          status: response.status,
          data: null,
          message: "Failed to add transaction."
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        data: null,
        message: err.response.data.message || "Failed to add transaction."
      };
    }
  };
  
  export const GetTransactionsByTeacherAPI = async (url, token,teacherId) => {
    try {
      const endpoint = `${url}${GetTransactionsByTeacher}/${teacherId}`;
      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
          message: "Transactions retrieved successfully!"
        };
      } else if (response.status === 401) {
        return {
          status: response.status,
          data: null,
          message: "Invalid token"
        };
      } else {
        return {
          status: response.status,
          data: null,
          message: "Failed to retrieve transactions."
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        data: null,
        message: "Failed to retrieve transactions."
      };
    }
  };
  

