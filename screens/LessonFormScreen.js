import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { lessonService } from '../services/lessonService';

export default function LessonFormScreen({ route, navigation }) {
  const { lesson } = route.params;
  const [fLessonName, setFLessonName] = useState(lesson?.fLessonName || "");
  const [fLessonDescription, setFLessonDescription] = useState(lesson?.fLessonDescription || "");

  const validateForm = () => {
    if (!fLessonName.trim()) {
      Alert.alert('Hata', 'Ders adı boş olamaz');
      return false;
    }
    if (!fLessonDescription.trim()) {
      Alert.alert('Hata', 'Ders açıklaması boş olamaz');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const updatedLesson = {
        fLessonId: lesson.fLessonId,
        fLessonName,
        fLessonDescription
      };

      console.log("Güncellenecek ders:", updatedLesson);
      await lessonService.updateLesson(updatedLesson);
      
      Alert.alert("Başarılı", "Ders başarıyla güncellendi!", [
        { text: "Tamam", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      Alert.alert("Hata", "Ders güncellenirken bir hata oluştu: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ders Adı:</Text>
        <TextInput
          style={styles.input}
          value={fLessonName}
          onChangeText={setFLessonName}
          placeholder="Ders Adı"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Açıklama:</Text>
        <TextInput
          style={styles.input}
          value={fLessonDescription}
          onChangeText={setFLessonDescription}
          placeholder="Ders Açıklaması"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Güncelle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333'
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});