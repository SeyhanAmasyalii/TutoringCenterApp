import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { lessonService } from '../services/lessonService';

export default function LessonCreateScreen({ navigation }) {
  const [fLessonName, setFLessonName] = useState("");
  const [fLessonDescription, setFLessonDescription] = useState("");

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

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const newLesson = { fLessonName, fLessonDescription };
      await lessonService.createLesson(newLesson);
      Alert.alert(
        "Başarılı", 
        "Ders başarıyla oluşturuldu!", 
        [{ text: "Tamam", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Oluşturma hatası:", error);
      Alert.alert("Hata", "Ders oluşturulurken bir hata oluştu");
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

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});