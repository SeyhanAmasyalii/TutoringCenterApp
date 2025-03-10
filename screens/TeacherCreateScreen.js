// screens/TeacherCreateScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { teacherService } from '../services/teacherService';

export default function TeacherCreateScreen({ navigation }) {
  const [fTeacherName, setFTeacherName] = useState("");
  const [fTeacherSurname, setFTeacherSurname] = useState("");
  const [fTeacherPhone, setFTeacherPhone] = useState("");
  const [fTeacherEmail, setFTeacherEmail] = useState("");

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

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const newTeacher = {
        fTeacherName,
        fTeacherSurname,
        fTeacherPhone,
        fTeacherEmail
      };

      await teacherService.createTeacher(newTeacher);
      Alert.alert(
        "Başarılı", 
        "Öğretmen başarıyla oluşturuldu!", 
        [{ text: "Tamam", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Oluşturma hatası:", error);
      Alert.alert("Hata", "Öğretmen oluşturulurken bir hata oluştu");
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
        style={styles.createButton}
        onPress={handleCreate}
      >
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