import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { teacherService } from '../services/teacherService';

export default function TeacherListScreen({ navigation }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Sayfa odaklanma durumunu takip et

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await teacherService.getTeachers();
      // Backend'den gelen verileri frontend format'ına dönüştür
      const transformedData = data.map((teacher, index) => ({
        fTeacherId: teacher.TeacherId || `temp-id-${index}`,
        fTeacherName: teacher.TeacherName,
        fTeacherSurname: teacher.TeacherSurname,
        fTeacherPhone: teacher.TeacherPhone,
        fTeacherEmail: teacher.TeacherEmail,
        ...teacher,
      }));
      setTeachers(transformedData);
    } catch (error) {
      console.error('Öğretmenler getirilirken hata:', error);
      alert('Öğretmenler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Sayfa odaklandığında fetchTeachers fonksiyonunu çağır
  useEffect(() => {
    if (isFocused) {
      fetchTeachers();
    }
  }, [isFocused]); // isFocused değiştiğinde effect tetiklenecek

  const handleDelete = async (teacherId) => {
    try {
      await teacherService.deleteTeacher(teacherId);
      alert('Öğretmen başarıyla silindi!');
      // Silme işleminden sonra listeyi güncelle
      fetchTeachers();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme sırasında bir hata oluştu.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={() => navigation.navigate('TeacherDetail', { teacherId: item.fTeacherId })}
      >
        <Text style={styles.itemText}>
          {item.fTeacherName} {item.fTeacherSurname}
        </Text>
        <Text style={styles.emailText}>
          {item.fTeacherEmail}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('TeacherForm', {
            teacher: {
              fTeacherId: item.fTeacherId,
              fTeacherName: item.fTeacherName,
              fTeacherSurname: item.fTeacherSurname,
              fTeacherPhone: item.fTeacherPhone,
              fTeacherEmail: item.fTeacherEmail,
            },
          })}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.fTeacherId)}
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
      {teachers.length === 0 ? (
        <Text style={styles.noDataText}>Henüz öğretmen bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={teachers}
          keyExtractor={(item) => item.fTeacherId}
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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
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
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});