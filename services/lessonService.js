import axios from 'axios';

import { ENDPOINTS } from '../config'; // config.js dosyasını içe aktarın

const BASE_URL = ENDPOINTS.LESSON

export const lessonService = {
  getLessons: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-lessons`);
      // Frontend'de kullanılacak alanda "f" önekini kullanabilirsiniz
      const transformedData = response.data.map((lesson, index) => ({
        fLessonId: lesson.lessonId || `temp-id-${index}`,
        fLessonName: lesson.lessonName,
        fLessonDescription: lesson.lessonDescription,
        ...lesson
      }));
      return transformedData;
    } catch (error) {
      console.error('Dersler getirilirken hata:', error);
      throw error;
    }
  },

  createLesson: async (lesson) => {
    try {
      const backendLesson = {
        lessonName: lesson.fLessonName,
        lessonDescription: lesson.fLessonDescription
      };
      console.log('Oluşturulacak ders:', backendLesson);
      const response = await axios.post(`${BASE_URL}/create-lesson`, backendLesson);
      return response.data;
    } catch (error) {
      console.error('Ders oluşturulurken hata:', error);
      throw error;
    }
  },

  updateLesson: async (lesson) => {
    try {
      const backendLesson = {
        lessonId: lesson.fLessonId,
        lessonName: lesson.fLessonName,
        lessonDescription: lesson.fLessonDescription
      };
      const response = await axios.put(`${BASE_URL}/update-lesson/${backendLesson.lessonId}`, backendLesson);
      return response.data;
    } catch (error) {
      console.error('Ders güncellenirken hata:', error);
      throw error;
    }
  },

  deleteLesson: async (lessonId) => {
    try {
      console.log('Silinecek ders ID:', lessonId);
      await axios.delete(`${BASE_URL}/delete-lesson/${lessonId}`);
    } catch (error) {
      console.error('Ders silinirken hata:', error);
      throw error;
    }
  },

  getLesson: async (lessonId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-lesson/${lessonId}`);
      const transformedData = {
        fLessonId: response.data.lessonId,
        fLessonName: response.data.lessonName,
        fLessonDescription: response.data.lessonDescription,
        ...response.data
      };
      return transformedData;
    } catch (error) {
      console.error('Ders getirilirken hata:', error);
      throw error;
    }
  }
};