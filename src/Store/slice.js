import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'userData',
  initialState: {
    role:'',
    user:[],
    LoginData:[],
    ClassData:[],
    StudentData:[],
    TeacherData:[],
    SubjectData:[],
    EventData:[],
    AnnouncementData:[],

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
    }
   
  },
})

export const {setRole,setUser,setLoginData,setClassData,setStudentData,setTeacherData,setSubjectData,setEventData,setAnnouncementData     } = dataSlice.actions
export default dataSlice.reducer