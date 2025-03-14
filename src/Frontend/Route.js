    // Principal endpoints
    export const SignupPrincipal = 'principal/register'
    export const LoginPrincipal = 'principal/login'

    // Teacher endpoints
    export const SignupTeacher = 'teacher/register'
    export const LoginTeacher = 'teacher/login'
    export const GetAllTeacher = 'teacher/all-teachers'
    export const MarkTeacherAttendance = 'teacher/attendance/mark'
    export const GetTeacherAttendance = 'teacher/getattendancehistory'

    // Student endpoints
    export const SignupStudent = 'student/register'
    export const LoginStudent = 'student/login'
    export const GetAllStudent = 'student/getallstudents'
    export const GetStudentByID = "student/getstudentbyid"

    // Class endpoints
    export const CreateClass = 'class/register'
    export const GetAllClass = 'class/all-classes'
    export const GetStudentByClass = "student/getstudentbyclassid"



// Subject endpoints
    export const CreateSubject = 'subject/create'
    export const GetAllSubject = 'subject/all-subjects'

// Exam endpoints

export const CreateExam = 'principal/create-exam'
export const GetAllExams = 'principal/getallexams'
export const UploadExamTimeTable = 'principal/upload-exam-timetable'

// Events
export const CreateEvent = 'event/create-event'
export const DeleteEvent = 'event/delete-events'
export const GetAllEvents = 'event/getallevents'

// Announcements
export const CreateAnnouncement = 'announcement/create-announcement'
export const DeleteAnnouncement = 'announcement/delete-announcement'
export const GetAllAnnouncements = 'announcement/getallannouncements'
//Complaints
export const CreateComplaint = 'student-complain/create-complaint'
export const GetAllComplaints= 'student-complain/getallcomplaints'
export const DeleteComplaint= 'student-complain/delete-complaint'