import axios from 'axios';

import { ENDPOINTS } from '../config'; // config.js dosyasını içe aktarın

const BASE_URL = ENDPOINTS.STUDENT;

export const studentService = {
  // Tüm öğrencileri getir
  getStudents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-students`);
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = response.data.map(student => ({
        fStudentId: student.studentId,
        fStudentName: student.studentName,
        fStudentSurname: student.studentSurname,
        fStudentGrade: student.studentGrade,
        fStudentPhone: student.studentPhone,
        fStudentEmail: student.studentEmail,
        ...student // Orijinal backend verilerini de sakla
      }));
      return transformedData;
    } catch (error) {
      console.error('Öğrenciler getirilirken hata:', error);
      throw error;
    }
  },

  // Yeni öğrenci oluştur
  createStudent: async (student) => {
    try {
      // Frontend verilerini backend formatına dönüştür
      const backendStudent = {
        studentName: student.fStudentName,
        studentSurname: student.fStudentSurname,
        studentGrade: student.fStudentGrade,
        studentPhone: student.fStudentPhone,
        studentEmail: student.fStudentEmail
      };

      console.log('Oluşturulacak öğrenci:', backendStudent);
      const response = await axios.post(`${BASE_URL}/create-student`, backendStudent);
      return response.data;
    } catch (error) {
      console.error('Öğrenci oluşturulurken hata:', error);
      throw error;
    }
  },

  // Öğrenci güncelle
  updateStudent: async (student) => {
    try {
      // Frontend verilerini backend formatına dönüştür
      const backendStudent = {
        studentId: student.fStudentId,
        studentName: student.fStudentName,
        studentSurname: student.fStudentSurname,
        studentGrade: student.fStudentGrade,
        studentPhone: student.fStudentPhone,
        studentEmail: student.fStudentEmail
      };

      console.log('Güncellenecek öğrenci:', backendStudent);
      const response = await axios.put(
        `${BASE_URL}/update-student/${backendStudent.studentId}`,
        backendStudent
      );
      return response.data;
    } catch (error) {
      console.error('Öğrenci güncellenirken hata:', error);
      throw error;
    }
  },

  // Öğrenci sil
  deleteStudent: async (studentId) => {
    try {
      console.log('Silinecek öğrenci ID:', studentId);
      await axios.delete(`${BASE_URL}/delete-student/${studentId}`);
    } catch (error) {
      console.error('Öğrenci silinirken hata:', error);
      throw error;
    }
  },

  // Tek bir öğrenciyi getir
  getStudent: async (studentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-student/${studentId}`);
      
      // Backend verilerini frontend formatına dönüştür
      const transformedData = {
        fStudentId: response.data.studentId,
        fStudentName: response.data.studentName,
        fStudentSurname: response.data.studentSurname,
        fStudentGrade: response.data.studentGrade,
        fStudentPhone: response.data.studentPhone,
        fStudentEmail: response.data.studentEmail,
        ...response.data // Orijinal backend verilerini de sakla
      };

      console.log('Getirilen öğrenci:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Öğrenci getirilirken hata:', error);
      throw error;
    }
  }
};