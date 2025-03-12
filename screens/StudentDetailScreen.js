import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { studentService } from '../services/studentService';
import { studentEnrollService } from '../services/studentEnrollService';

export default function StudentDetailScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [student, setStudent] = useState(null);
  const [enrollTypes, setEnrollTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const [studentData, enrollData] = await Promise.all([
        studentService.getStudent(studentId),
        studentEnrollService.getEnrollmentsByStudent(studentId)
      ]);
      setStudent(studentData);
      setEnrollTypes(enrollData);
    } catch (error) {
      console.error('Veri alınırken hata:', error);
      Alert.alert('Hata', 'Öğrenci bilgileri alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Silme Onayı',
      'Bu öğrenciyi silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await studentService.deleteStudent(student.fStudentId);
              Alert.alert('Başarılı', 'Öğrenci başarıyla silindi.');
              navigation.navigate('StudentList');
            } catch (error) {
              console.error('Silme hatası:', error);
              Alert.alert('Hata', 'Öğrenci silinirken bir hata oluştu.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Öğrenci bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öğrenci Bilgileri</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ad:</Text>
          <Text style={styles.value}>{student.fStudentName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Soyad:</Text>
          <Text style={styles.value}>{student.fStudentSurname}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Sınıf:</Text>
          <Text style={styles.value}>{student.fStudentGrade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{student.fStudentPhone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.fStudentEmail}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kayıt Tipleri</Text>
        {enrollTypes.length > 0 ? (
          enrollTypes.map((type, index) => (
            <View key={type.enrollId} style={styles.enrollTypeItem}>
              <Text style={styles.enrollTypeName}>{type.enrollName}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Henüz kayıt tipi atanmamış.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('StudentForm', { student })}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 16,
    color: 'red'
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  label: {
    flex: 1,
    fontWeight: '600',
    color: '#666'
  },
  value: {
    flex: 2,
    color: '#333'
  },
  enrollTypeItem: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5
  },
  enrollTypeName: {
    color: '#1976d2',
    fontSize: 14
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});