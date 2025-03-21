import ProfilePage from "./AboutMe";
import LandingPage2 from "./LandingPage2";
import Login from "./Login";
import RegisterPrincipal from "./Principal/RegisterPrincipal";
import UserOption from "./UserOption";
import Events from "./Events";
import PerformanceDashboard from '../Components/Performance'
import PaymentMethodSelector from "./Payment/PaymentMode";
import LeaderBoard from "./Mark/LeaderBoard"; 
import UnderMaintenance from "./UnderMaintence"; 
import AllComplaints from './Complaints/AllComplaint'; 
import StudentComplaints from './Complaints/StudentComplaintDetails'
import CertificateGenerator from '../Components/Cards/Certificate'
import IDCardGenerator from '../Components/Cards/IDCard'
import AllTransactions from './Teacher/AllTransaction'

// exam
import CreateExam from "./Exam/AllExam";
import ExamTimeTable from "./Exam/ExamTimeTable";
// student
import MySubjects from "./Student/MySubject";
import MyExams from "./Student/MyExam";
import MyResults from "./Student/MyResult";
import MyTimeTable from "./Student/MyTimeTable";
import MyAttendance from "./Student/MyAttendance";
import AddStudents from "./Student/AddStudent";
import StudentDetails from '../Components/Classes/AllStudents'

// teacher
import MyStudents from "./Teacher/MyStudent";
import AssignClassSub from "./Teacher/AssignClassSub";
import MakeClassTeacher from './Teacher/MakeClassTeacher'
import TeacherAttendanceSystem from "../Components/AttendanceSystem/MarkAttendanceTeacher"
// import AddTeacher from "./Teacher/Addteacher";
import TeacherDetails from "./Teacher/AllTeacher";
import Results from "./Teacher/Results";

// subjects
import RegisterSubjects from "./Subjects/RegisterSubject";
import AllSubjects from "./Subjects/AllSubject";

// timetable
import UploadTimeTable from "./TimeTable/UploadTimeTable";
// classes
import RegisterClass from "./Classes/RegisterClass";
import StudentAttendanceSystem from "../Components/AttendanceSystem/MarkAttendanceByClass";
import AllClasses from "./Classes/AllClass";
//principal

//Exams
import AllExams from "./Exam/AllExam";
//Khata Book




export {
  ProfilePage,
  LandingPage2,
  Login,
  RegisterPrincipal,
  UserOption,
  Events,
  PerformanceDashboard,
  PaymentMethodSelector,
  LeaderBoard,
  UnderMaintenance,
  AllComplaints,
  StudentComplaints,
  CertificateGenerator,
  IDCardGenerator,
  // exam
  CreateExam,
  ExamTimeTable,
  AllExams,
  // student
  MySubjects,
  MyExams,
  MyResults,
  MyTimeTable,
  MyAttendance,
  AddStudents,
  StudentDetails,
  // teacher
  MyStudents,
  AssignClassSub,
  TeacherAttendanceSystem,
  MakeClassTeacher,
  // AddTeacher,
  TeacherDetails,
  Results,
  // subject
  RegisterSubjects,
  AllSubjects,
  // timetable
  UploadTimeTable,
  // classes
  RegisterClass,
  StudentAttendanceSystem,
  AllClasses,
  AllTransactions
};
