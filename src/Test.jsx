import React from 'react';
import StudentDetails from './Frontend/Components/Classes/AllStudents';
import RegisterClass from './Frontend/Pages/Classes/RegisterClass';
import MyAttendance from './Frontend/Pages/Student/MyAttendance'
import SchoolLandingPage from './Frontend/Pages/LandingPage2'
import AttendanceSystem from './Frontend/Components/AttendanceSystem/MarkAttendanceByClass'
import CertificateGenerator from './Frontend/Components/Cards/Certificate'
import IDCardGenerator from './Frontend/Components/Cards/IDCard'
const Test = () => {
    return (
        <div>
            {/* <CertificateGenerator/> */}
            <IDCardGenerator/>
        </div>
    );
};

export default Test;