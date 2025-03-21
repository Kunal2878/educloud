import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'

const dataSlice = createSlice({
  name: 'userData',
  initialState: {
    role:'',
    StudentCount:'',
    TeacherCount:'',
    CurrentPage:1,
    user:[],
    LoginData:[],
    ClassData:[],
    StudentData:[],
    TeacherData:[],
    SubjectData:[],
    EventData:[],
    AnnouncementData:[],
    LeaderBoardData:[],
    TransactionData:[],

  },
  reducers: {
  
    setRole: (state,action) => {
      // state.id = action.payload.id,
      state.role = action.payload
    },
    setUser:(state,action) => {
      state.user=action.payload
    },
    setLoginData:(state,action) => {
      state.LoginData=action.payload
    },
    setClassData:(state,action) => {
      state.ClassData=action.payload
    },
    setStudentData:(state,action) => {
      state.StudentData=action.payload
    },
    setTeacherData:(state,action) => {
      state.TeacherData=action.payload
    },
    setSubjectData:(state,action) => {
      state.SubjectData=action.payload
    },
    setEventData:(state,action) => {
      state.EventData=action.payload
    },
    setAnnouncementData:(state,action) => {
      state.AnnouncementData=action.payload
    },
   setStudentCount:(state,action) => {
      state.StudentCount=action.payload
    },
    setTeacherCount:(state,action) => {
      state.TeacherCount=action.payload
    },
    setLeaderBoard:(state,action) => {
      state.LeaderBoardData=action.payload
    },
    setCurrentPage:(state,action) => {
      state.CurrentPage=action.payload
    },
    setTransactionData:(state,action) => {
      state.TransactionData=action.payload
    },
  },
})

export const {setRole,setUser,setLoginData,setClassData,setStudentData,setTeacherData,setSubjectData,
  setEventData,setAnnouncementData,setStudentCount,setTeacherCount,
  setLeaderBoard,setCurrentPage,setTransactionData}
 = dataSlice.actions
export default dataSlice.reducer