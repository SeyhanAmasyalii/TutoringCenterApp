import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { studentService } from '../services/studentService';

export default function StudentCreateScreen({ navigation }) {
  const [fStudentName, setFStudentName] = useState("");
  const [fStudentSurname, setFStudentSurname] = useState("");
  const [fStudentGrade, setFStudentGrade] = useState("");
  const [fStudentPhone, setFStudentPhone] = useState("");
  const [fStudentEmail, setFStudentEmail] = useState("");

  const validateForm = () => {
    if (!fStudentName.trim()) {
      Alert.alert('Hata', 'Öğrenci adı boş olamaz');
      return false;
    }
    if (!fStudentSurname.trim()) {
      Alert.alert('Hata', 'Öğrenci soyadı boş olamaz');
      return false;
    }
    if (!fStudentGrade.trim()) {
      Alert.alert('Hata', 'Sınıf bilgisi boş olamaz');
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const newStudent = {
        fStudentName,
        fStudentSurname,
        fStudentGrade,
        fStudentPhone,
        fStudentEmail
      };

      await studentService.createStudent(newStudent);
      Alert.alert(
        "Başarılı",
        "Öğrenci başarıyla oluşturuldu!",
        [{ text: "Tamam", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Oluşturma hatası:", error);
      Alert.alert("Hata", "Öğrenci oluşturulurken bir hata oluştu");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ad:</Text>
        <TextInput
          style={styles.input}
          value={fStudentName}
          onChangeText={setFStudentName}
          placeholder="Öğrenci Adı"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Soyad:</Text>
        <TextInput
          style={styles.input}
          value={fStudentSurname}
          onChangeText={setFStudentSurname}
          placeholder="Öğrenci Soyadı"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sınıf:</Text>
        <TextInput
          style={styles.input}
          value={fStudentGrade}
          onChangeText={setFStudentGrade}
          placeholder="Sınıf"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Telefon:</Text>
        <TextInput
          style={styles.input}
          value={fStudentPhone}
          onChangeText={setFStudentPhone}
          placeholder="Telefon"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={fStudentEmail}
          onChangeText={setFStudentEmail}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Oluştur</Text>
      </TouchableOpacity>
    </ScrollView>
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
  createButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});