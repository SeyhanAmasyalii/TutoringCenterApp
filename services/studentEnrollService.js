import axios from 'axios';

import { ENDPOINTS } from '../config'; // config.js dosyasını içe aktarın

const BASE_URL = ENDPOINTS.STUDENT_ENROLL;

export const studentEnrollService = {
  // Öğrenciyi kayıt tipine kaydet
  enrollStudent: async (enrollment) => {
    try {
      const backendEnrollment = {
        studentId: enrollment.fStudentId,
        enrollId: enrollment.fEnrollId
      };

      console.log('Yapılacak kayıt:', backendEnrollment);
      const response = await axios.post(`${BASE_URL}/enroll-student`, backendEnrollment);
      return response.data;
    } catch (error) {
      console.error('Kayıt yapılırken hata:', error);
      throw error;
    }
  },

  // Öğrenci kaydını kaldır
  removeEnrollment: async (enrollment) => {
    try {
      console.log('Silinecek kayıt:', enrollment);
      await axios.delete(`${BASE_URL}/remove-student-enrollment/${enrollment.studentEnrollId}`);
    } catch (error) {
      console.error('Kayıt silinirken hata:', error);
      throw error;
    }
  },

  // Öğrencinin kayıt tiplerini getir
  getEnrollmentsByStudent: async (studentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-enrollments-by-student/${studentId}`);
      
      const transformedData = response.data.map(enrollType => ({
        fEnrollId: enrollType.enrollId,
        fEnrollName: enrollType.enrollName,
        ...enrollType
      }));

      console.log('Öğrencinin kayıt tipleri:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Kayıt tipleri getirilirken hata:', error);
      throw error;
    }
  },

  // Tüm kayıtları getir
  getAllEnrollments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-student-enrollments`);
      
      const transformedData = response.data.map(enrollment => ({
        fStudentEnrollId: enrollment.studentEnrollId,
        fStudentId: enrollment.studentId,
        fEnrollId: enrollment.enrollId,
        ...enrollment
      }));

      return transformedData;
    } catch (error) {
      console.error('Tüm kayıtlar getirilirken hata:', error);
      throw error;
    }
  }
};