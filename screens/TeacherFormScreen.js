import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { teacherService } from '../services/teacherService';

export default function TeacherFormScreen({ route, navigation }) {
  const { teacher } = route.params;

  // Frontend state değişkenleri 'f' ön ekiyle (gelen nesnede aynı anahtarlar kullanılmalı)
  const [fTeacherName, setFTeacherName] = useState(teacher?.fTeacherName || "");
  const [fTeacherSurname, setFTeacherSurname] = useState(teacher?.fTeacherSurname || "");
  const [fTeacherPhone, setFTeacherPhone] = useState(teacher?.fTeacherPhone || "");
  const [fTeacherEmail, setFTeacherEmail] = useState(teacher?.fTeacherEmail || "");

  const validateForm = () => {
    if (!fTeacherName.trim()) {
      Alert.alert('Hata', 'Öğretmen adı boş olamaz');
      return false;
    }
    if (!fTeacherSurname.trim()) {
      Alert.alert('Hata', 'Öğretmen soyadı boş olamaz');
      return false;
    }
    if (!fTeacherPhone.trim()) {
      Alert.alert('Hata', 'Telefon numarası boş olamaz');
      return false;
    }
    if (!fTeacherEmail.trim()) {
      Alert.alert('Hata', 'Email adresi boş olamaz');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
  if (!validateForm()) return;

  try {
    const updatedTeacher = {
      TeacherId: teacher.fTeacherId,
      TeacherName: fTeacherName,
      TeacherSurname: fTeacherSurname,
      TeacherPhone: fTeacherPhone,
      TeacherEmail: fTeacherEmail
    };

    console.log("Güncellenecek öğretmen:", updatedTeacher);
    await teacherService.updateTeacher(updatedTeacher);
    
    Alert.alert("Başarılı", "Öğretmen başarıyla güncellendi!", [
      { text: "Tamam", onPress: () => navigation.goBack() }
    ]);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
    Alert.alert("Hata", "Güncelleme sırasında bir hata oluştu: " + error.message);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ad:</Text>
        <TextInput
          style={styles.input}
          value={fTeacherName}
          onChangeText={setFTeacherName}
          placeholder="Öğretmen Adı"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Soyad:</Text>
        <TextInput
          style={styles.input}
          value={fTeacherSurname}
          onChangeText={setFTeacherSurname}
          placeholder="Öğretmen Soyadı"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Telefon:</Text>
        <TextInput
          style={styles.input}
          value={fTeacherPhone}
          onChangeText={setFTeacherPhone}
          placeholder="Telefon Numarası"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={fTeacherEmail}
          onChangeText={setFTeacherEmail}
          placeholder="Email Adresi"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity 
        style={styles.updateButton}
        onPress={handleUpdate}
      >
        <Text style={styles.updateButtonText}>Güncelle</Text>
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
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});