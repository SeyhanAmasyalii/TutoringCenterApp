import axios from 'axios';

import { ENDPOINTS } from '../config'; // config.js dosyasını içe aktarın

const BASE_URL = ENDPOINTS.TEACHER_LESSON;


export const teacherLessonService = {
  // Öğretmene ders atama
  assignTeacherToLesson: async (teacherLesson) => {
    try {
      console.log('Ders atama isteği başlatıldı:', teacherLesson);
      
      const backendTeacherLesson = {
        teacherId: teacherLesson.fTeacherId,
        lessonId: teacherLesson.fLessonId
      };
      
      console.log('Backend\'e gönderilecek veri:', backendTeacherLesson);
      const response = await axios.post(`${BASE_URL}/assign-teacher-to-lesson`, backendTeacherLesson);
      console.log('Ders atama yanıtı:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Ders atama hatası:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  },

  // Öğretmenden ders kaldırma
  removeTeacherFromLesson: async (teacherLessonId) => {
    try {
      console.log('Ders kaldırma isteği başlatıldı - teacherLessonId:', teacherLessonId);
      
      await axios.delete(`${BASE_URL}/remove-teacher-from-lesson/${teacherLessonId}`);
      console.log('Ders başarıyla kaldırıldı');
    } catch (error) {
      console.error('Ders kaldırma hatası:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  },

  // Öğretmenin atandığı dersleri getirme
  getLessonsByTeacher: async (teacherId) => {
    try {
      console.log('Öğretmenin derslerini getirme isteği başlatıldı - teacherId:', teacherId);
      
      const response = await axios.get(`${BASE_URL}/get-lessons-by-teacher/${teacherId}`);
      console.log('Backend\'den gelen ham veri:', response.data);
      
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = response.data.map(lesson => ({
        fLessonId: lesson.lessonId,
        fLessonName: lesson.lessonName,
        fLessonDescription: lesson.lessonDescription,
        teacherLessonId: lesson.teacherLessonId,
        ...lesson
      }));
      
      console.log('Dönüştürülmüş ders verileri:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Öğretmenin dersleri getirilirken hata:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  },

  // Derse atanan öğretmenleri getirme
  getTeachersByLesson: async (lessonId) => {
    try {
      console.log('Dersin öğretmenlerini getirme isteği başlatıldı - lessonId:', lessonId);
      
      const response = await axios.get(`${BASE_URL}/get-teachers-by-lesson/${lessonId}`);
      console.log('Backend\'den gelen ham veri:', response.data);
      
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = response.data.map(teacher => ({
        fTeacherId: teacher.teacherId,
        fTeacherName: teacher.teacherName,
        fTeacherSurname: teacher.teacherSurname,
        fTeacherPhone: teacher.teacherPhone,
        fTeacherEmail: teacher.teacherEmail,
        ...teacher
      }));
      
      console.log('Dönüştürülmüş öğretmen verileri:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Dersin öğretmenleri getirilirken hata:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  },

  // Belirli bir öğretmen-ders atamasını getirme
  getTeacherLesson: async (teacherLessonId) => {
    try {
      console.log('Öğretmen-ders ataması getirme isteği başlatıldı - teacherLessonId:', teacherLessonId);
      
      const response = await axios.get(`${BASE_URL}/get-teacher-lesson/${teacherLessonId}`);
      console.log('Backend\'den gelen ham veri:', response.data);
      
      // Backend'den gelen veriyi frontend formatına dönüştür
      const transformedData = {
        fTeacherLessonId: response.data.teacherLessonId,
        fTeacherId: response.data.teacherId,
        fLessonId: response.data.lessonId,
        ...response.data
      };
      
      console.log('Dönüştürülmüş öğretmen-ders atama verisi:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Öğretmen-ders ataması getirilirken hata:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  },

  // Tüm öğretmen-ders atamalarını getirme
  getAllTeacherLessons: async () => {
    try {
      console.log('Tüm öğretmen-ders atamalarını getirme isteği başlatıldı');
      
      const response = await axios.get(`${BASE_URL}/get-all-teacher-lessons`);
      console.log('Backend\'den gelen ham veri:', response.data);
      
      // Backend'den gelen verileri frontend formatına dönüştür
      const transformedData = response.data.map(teacherLesson => ({
        fTeacherLessonId: teacherLesson.teacherLessonId,
        fTeacherId: teacherLesson.teacherId,
        fLessonId: teacherLesson.lessonId,
        ...teacherLesson
      }));
      
      console.log('Dönüştürülmüş tüm öğretmen-ders atama verileri:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Tüm öğretmen-ders atamaları getirilirken hata:', error);
      console.error('Hata detayı:', error.response?.data);
      throw error;
    }
  }
};