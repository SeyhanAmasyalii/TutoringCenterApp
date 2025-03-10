import axios from 'axios';


//const BASE_URL = 'https://tutoringcentermanagerapp-gbhbfxeydac5crfc.westeurope-01.azurewebsites.net/api/teacher'; // Backend API URL'sini buraya yazın

const BASE_URL = 'http://192.168.1.107:5185/api/teacher'; // Backend API URL'sini buraya yazın

export const teacherService = {
  getTeachers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-teachers`);
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = response.data.map(teacher => ({
        fTeacherId: teacher.teacherId,
        fTeacherName: teacher.teacherName,
        fTeacherSurname: teacher.teacherSurname,
        fTeacherPhone: teacher.teacherPhone,
        fTeacherEmail: teacher.teacherEmail,
        // Backend verilerini de sakla
        ...teacher
      }));
      return transformedData;
    } catch (error) {
      console.error('Öğretmenler getirilirken hata:', error);
      throw error;
    }
  },

  createTeacher: async (teacher) => {
    try {
      // Frontend'den gelen verileri backend formatına dönüştür
      const backendTeacher = {
        teacherId: teacher.fTeacherId,
        teacherName: teacher.fTeacherName,
        teacherSurname: teacher.fTeacherSurname,
        teacherPhone: teacher.fTeacherPhone,
        teacherEmail: teacher.fTeacherEmail
      };

      console.log('Oluşturulacak öğretmen:', backendTeacher);
      const response = await axios.post(`${BASE_URL}/create-teacher`, backendTeacher);
      return response.data;
    } catch (error) {
      console.error('Öğretmen oluşturulurken hata:', error);
      throw error;
    }
  },

updateTeacher: async (teacher) => {
  try {
    // Frontend verilerini backend formatına dönüştür
    const backendTeacher = {
      TeacherId: teacher.TeacherId,
      TeacherName: teacher.TeacherName,
      TeacherSurname: teacher.TeacherSurname,
      TeacherPhone: teacher.TeacherPhone,
      TeacherEmail: teacher.TeacherEmail
    };

    const response = await axios.put(
      `${BASE_URL}/update-teacher/${backendTeacher.TeacherId}`, 
      backendTeacher
    );
    return response.data;
  } catch (error) {
    console.error('Öğretmen güncellenirken hata:', error);
    throw error;
  }
},

  deleteTeacher: async (teacherId) => {
    try {
      console.log('Silinecek öğretmen ID:', teacherId);
      await axios.delete(`${BASE_URL}/delete-teacher/${teacherId}`);
    } catch (error) {
      console.error('Öğretmen silinirken hata:', error);
      throw error;
    }
  },

  getTeacher: async (teacherId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-teacher/${teacherId}`);
      
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = {
        fTeacherId: response.data.teacherId,
        fTeacherName: response.data.teacherName,
        fTeacherSurname: response.data.teacherSurname,
        fTeacherPhone: response.data.teacherPhone,
        fTeacherEmail: response.data.teacherEmail,
        // Backend verilerini de sakla
        ...response.data
      };

      console.log('Getirilen öğretmen:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Öğretmen getirilirken hata:', error);
      throw error;
    }
  }
};