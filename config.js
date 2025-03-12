// config.js

// Development URL (local geliştirme için)
const DEV_API_URL = 'http://192.168.1.104:5185/api';

// Production URL (canlı ortam için)
const PROD_API_URL = 'https://tutoringcentermanagerapp-gbhbfxeydac5crfc.westeurope-01.azurewebsites.net/api';

// Hangi URL'nin kullanılacağını belirleyin (__DEV__ React Native'in geliştirme modunda true olan bir değişkenidir)
export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

// Her servis için endpoint'leri oluşturun
export const ENDPOINTS = {
  ENROLL_TYPE: `${API_BASE_URL}/enroll-type`,
  LESSON: `${API_BASE_URL}/lesson`,
  STUDENT_ENROLL: `${API_BASE_URL}/student-enroll`,
  STUDENT: `${API_BASE_URL}/student`,
  TEACHER_LESSON: `${API_BASE_URL}/teacher-lesson`,
  TEACHER: `${API_BASE_URL}/teacher`,
};