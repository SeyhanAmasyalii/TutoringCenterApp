import axios from 'axios';

import { ENDPOINTS } from '../config'; // config.js dosyasını içe aktarın

const BASE_URL = ENDPOINTS.ENROLL_TYPE;


export const enrollTypeService = {
  // Tüm kayıt tiplerini getir
  getEnrollTypes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-enroll-types`);
      
      const transformedData = response.data.map(enrollType => ({
        fEnrollId: enrollType.enrollId,
        fEnrollName: enrollType.enrollName,
        ...enrollType
      }));

      return transformedData;
    } catch (error) {
      console.error('Kayıt tipleri getirilirken hata:', error);
      throw error;
    }
  },

  // Tek bir kayıt tipini getir
  getEnrollType: async (enrollId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-enroll-type/${enrollId}`);
      
      const transformedData = {
        fEnrollId: response.data.enrollId,
        fEnrollName: response.data.enrollName,
        ...response.data
      };

      return transformedData;
    } catch (error) {
      console.error('Kayıt tipi getirilirken hata:', error);
      throw error;
    }
  },

  // Yeni kayıt tipi oluştur
  createEnrollType: async (enrollType) => {
    try {
      const backendEnrollType = {
        enrollName: enrollType.fEnrollName
      };

      const response = await axios.post(`${BASE_URL}/create-enroll-type`, backendEnrollType);
      return response.data;
    } catch (error) {
      console.error('Kayıt tipi oluşturulurken hata:', error);
      throw error;
    }
  },

  // Kayıt tipini güncelle
  updateEnrollType: async (enrollType) => {
    try {
      const backendEnrollType = {
        enrollId: enrollType.fEnrollId,
        enrollName: enrollType.fEnrollName
      };

      const response = await axios.put(
        `${BASE_URL}/update-enroll-type/${backendEnrollType.enrollId}`,
        backendEnrollType
      );
      return response.data;
    } catch (error) {
      console.error('Kayıt tipi güncellenirken hata:', error);
      throw error;
    }
  },

  // Kayıt tipini sil
  deleteEnrollType: async (enrollId) => {
    try {
      await axios.delete(`${BASE_URL}/delete-enroll-type/${enrollId}`);
    } catch (error) {
      console.error('Kayıt tipi silinirken hata:', error);
      throw error;
    }
  }
};