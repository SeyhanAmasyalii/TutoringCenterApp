import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { studentService } from '../services/studentService';
import { studentEnrollService } from '../services/studentEnrollService';
import { enrollTypeService } from '../services/enrollTypeService';

export default function StudentFormScreen({ route, navigation }) {
  const { student } = route.params;
  
  // Öğrenci bilgileri için state'ler
  const [fStudentName, setFStudentName] = useState(student?.fStudentName || "");
  const [fStudentSurname, setFStudentSurname] = useState(student?.fStudentSurname || "");
  const [fStudentGrade, setFStudentGrade] = useState(student?.fStudentGrade || "");
  const [fStudentPhone, setFStudentPhone] = useState(student?.fStudentPhone || "");
  const [fStudentEmail, setFStudentEmail] = useState(student?.fStudentEmail || "");
  
  // Enroll type yönetimi için state'ler
  const [availableEnrollTypes, setAvailableEnrollTypes] = useState([]);
  const [assignedEnrollTypes, setAssignedEnrollTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Tüm enroll type'ları getir
      const allTypes = await enrollTypeService.getEnrollTypes();
      
      if (student?.fStudentId) {
        // Öğrenciye atanmış enroll type'ları getir
        const assigned = await studentEnrollService.getEnrollmentsByStudent(student.fStudentId);
        setAssignedEnrollTypes(assigned);
        
        // Atanmamış enroll type'ları filtrele
        const availableTypes = allTypes.filter(type => 
          !assigned.some(assignedType => assignedType.fEnrollId === type.fEnrollId)
        );
        setAvailableEnrollTypes(availableTypes);
      } else {
        // Yeni öğrenci oluşturuluyorsa tüm tipleri available olarak göster
        setAvailableEnrollTypes(allTypes);
        setAssignedEnrollTypes([]);
      }
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
      Alert.alert('Hata', 'Veriler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

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

  const handleAssignEnrollType = async (enrollType) => {
    try {
      await studentEnrollService.enrollStudent({
        fStudentId: student.fStudentId,
        fEnrollId: enrollType.fEnrollId
      });
      
      setAssignedEnrollTypes(prev => [...prev, enrollType]);
      setAvailableEnrollTypes(prev => 
        prev.filter(type => type.fEnrollId !== enrollType.fEnrollId)
      );
    } catch (error) {
      console.error('Enroll type atama hatası:', error);
      Alert.alert('Hata', 'Enroll type atanırken bir hata oluştu');
    }
  };

  const handleRemoveEnrollType = async (enrollType) => {
    try {
      await studentEnrollService.removeEnrollment({
        fStudentId: student.fStudentId,
        fEnrollId: enrollType.fEnrollId
      });
      
      setAvailableEnrollTypes(prev => [...prev, enrollType]);
      setAssignedEnrollTypes(prev => 
        prev.filter(type => type.fEnrollId !== enrollType.fEnrollId)
      );
    } catch (error) {
      console.error('Enroll type kaldırma hatası:', error);
      Alert.alert('Hata', 'Enroll type kaldırılırken bir hata oluştu');
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const updatedStudent = {
        fStudentId: student.fStudentId,
        fStudentName,
        fStudentSurname,
        fStudentGrade,
        fStudentPhone,
        fStudentEmail
      };

      await studentService.updateStudent(updatedStudent);
      Alert.alert(
        "Başarılı",
        "Öğrenci bilgileri başarıyla güncellendi!",
        [{ text: "Tamam", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      Alert.alert("Hata", "Öğrenci güncellenirken bir hata oluştu");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Öğrenci Bilgileri Formu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öğrenci Bilgileri</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ad:</Text>
          <TextInput
            style={styles.input}
            value={fStudentName}
            onChangeText={setFStudentName}
            placeholder="Öğrenci Adı"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Soyad:</Text>
          <TextInput
            style={styles.input}
            value={fStudentSurname}
            onChangeText={setFStudentSurname}
            placeholder="Öğrenci Soyadı"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Sınıf:</Text>
          <TextInput
            style={styles.input}
            value={fStudentGrade}
            onChangeText={setFStudentGrade}
            placeholder="Sınıf"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefon:</Text>
          <TextInput
            style={styles.input}
            value={fStudentPhone}
            onChangeText={setFStudentPhone}
            placeholder="Telefon"
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
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Enroll Type Yönetimi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kayıt Tipleri</Text>
        
        <View style={styles.enrollTypesContainer}>
          {/* Sol Liste - Atanabilecek Enroll Type'lar */}
          <View style={styles.enrollTypeList}>
            <Text style={styles.listTitle}>Atanabilecek Kayıt Tipleri</Text>
            {availableEnrollTypes.map((type) => (
              <TouchableOpacity
                key={type.fEnrollId}
                style={styles.enrollTypeItem}
                onPress={() => handleAssignEnrollType(type)}
              >
                <Text style={styles.enrollTypeText}>{type.fEnrollName}</Text>
                <Text style={styles.addIcon}>+</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sağ Liste - Atanmış Enroll Type'lar */}
          <View style={styles.enrollTypeList}>
            <Text style={styles.listTitle}>Atanmış Kayıt Tipleri</Text>
            {assignedEnrollTypes.map((type) => (
              <TouchableOpacity
                key={type.fEnrollId}
                style={[styles.enrollTypeItem, styles.assignedItem]}
                onPress={() => handleRemoveEnrollType(type)}
              >
                <Text style={styles.enrollTypeText}>{type.fEnrollName}</Text>
                <Text style={styles.removeIcon}>×</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Güncelleme Butonu */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Güncelle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  enrollTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  enrollTypeList: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    minHeight: 200,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#666',
  },
  enrollTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  assignedItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  enrollTypeText: {
    fontSize: 14,
    flex: 1,
  },
  addIcon: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  removeIcon: {
    fontSize: 20,
    color: '#f44336',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});