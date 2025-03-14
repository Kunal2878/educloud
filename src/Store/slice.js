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
    SubjectData:[]

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
    }
   
  },
})

export const {setRole,setUser,setLoginData,setClassData,setStudentData,setTeacherData,setSubjectData} = dataSlice.actions
export default dataSlice.reducer