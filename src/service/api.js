import axios from "axios";

import {
    SignupPrincipal, LoginPrincipal, SignupTeacher, LoginTeacher, GetAllTeacher, MarkTeacherAttendance,
    GetTeacherAttendance, SignupStudent,LoginStudent,GetAllStudent,CreateClass,
    GetAllClass, CreateSubject, GetAllSubject, CreateExam, GetAllExams, UploadExamTimeTable, CreateEvent, DeleteEvent,
    CreateAnnouncement,DeleteAnnouncement,CreateComplaint,GetAllComplaints,
    DeleteComplaint, GetAllEvents, GetAllAnnouncements
  } from '../Frontend/Route';

export const LoginUser = async (url, payload, role) => {
  try {
    let endpoint = `${url}${LoginPrincipal}`;
    if (role === "student") {
      endpoint = `${url}${LoginStudent}`;
    } else if (role === "teacher") {
      endpoint = `${url}${LoginTeacher}`;
    }

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

export const GetStudents = async (url) => {
  try {
    const endpoint = `${url}${GetAllStudent}`;
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

export const CreateSubjectAPI = async (url, payload) => {
  try {
    const endpoint = `${url}${CreateSubject}`;
    const response = await axios.post(endpoint, payload);
    
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

export const GetExams = async (url) => {
  try {
    const endpoint = `${url}${GetAllExams}`;
    const response = await axios.get(endpoint);
    
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data,
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
        data: response.data,
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
  try {
    const endpoint = `${url}${DeleteEvent}/${eventId}`;
    const response = await axios.delete(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return {
        status: response.status,
        data: response.data,
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
        data: response.data,
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