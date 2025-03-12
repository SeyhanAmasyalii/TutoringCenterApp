import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { studentService } from '../services/studentService';
import { useIsFocused } from '@react-navigation/native';

export default function StudentListScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // Öğrencileri getir
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Öğrenciler getirilirken hata:', error);
      alert('Öğrenciler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Ekran fokuslandığında öğrencileri yeniden getir
  useEffect(() => {
    if (isFocused) {
      fetchStudents();
    }
  }, [isFocused]);

  // Öğrenci silme işlemi
  const handleDelete = async (studentId) => {
    try {
      await studentService.deleteStudent(studentId);
      alert('Öğrenci başarıyla silindi!');
      fetchStudents(); // Listeyi güncelle
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Öğrenci silinirken bir hata oluştu.');
    }
  };

  // Her bir öğrenci için liste öğesi
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={() => navigation.navigate('StudentForm', { student: item })}
      >
        <Text style={styles.linkText}>
          {item.studentName} {item.studentSurname}
        </Text>
        <Text style={styles.infoText}>Sınıf: {item.studentGrade}</Text>
        <Text style={styles.infoText}>
          {item.studentPhone} | {item.studentEmail}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('StudentForm', { student: item })}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.studentId)}
        >
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('StudentCreate')}
      >
        <Text style={styles.createButtonText}>Yeni Öğrenci Ekle</Text>
      </TouchableOpacity>

      {students.length === 0 ? (
        <Text style={styles.noDataText}>Henüz öğrenci kaydı bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.studentId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
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
  listContainer: {
    padding: 10
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nameContainer: {
    marginBottom: 10
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    textDecorationLine: 'underline',
    marginBottom: 4,
    paddingVertical: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '500'
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center'
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  }
});