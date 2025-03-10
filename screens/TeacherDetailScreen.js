import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert,
  StyleSheet,
  ScrollView 
} from 'react-native';
import { teacherService } from '../services/teacherService';

export default function TeacherDetailScreen({ route, navigation }) {
  const { teacherId } = route.params;
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const data = await teacherService.getTeacher(teacherId);
      // Backend verilerini frontend formatına dönüştür
      const transformedData = {
        fTeacherId: data.TeacherId,
        fTeacherName: data.TeacherName,
        fTeacherSurname: data.TeacherSurname,
        fTeacherPhone: data.TeacherPhone,
        fTeacherEmail: data.TeacherEmail,
        // Backend verilerini de sakla
        ...data
      };
      setTeacher(transformedData);
    } catch (error) {
      console.error('Öğretmen bilgileri alınırken hata:', error);
      Alert.alert('Hata', 'Öğretmen bilgileri alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Silme Onayı',
      'Bu öğretmeni silmek istediğinize emin misiniz?',
      [
        { 
          text: 'İptal', 
          style: 'cancel' 
        },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await teacherService.deleteTeacher(teacher.fTeacherId);
              Alert.alert('Başarılı', 'Öğretmen başarıyla silindi.');
              navigation.navigate('TeacherList');
            } catch (error) {
              console.error('Silme hatası:', error);
              Alert.alert('Hata', 'Öğretmen silinirken bir hata oluştu.');
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

  if (!teacher) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Öğretmen bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>İsim:</Text>
          <Text style={styles.value}>{teacher.fTeacherName}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Soyisim:</Text>
          <Text style={styles.value}>{teacher.fTeacherSurname}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{teacher.fTeacherPhone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{teacher.fTeacherEmail}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('TeacherForm', { 
            teacher: {
              fTeacherId: teacher.fTeacherId,
              fTeacherName: teacher.fTeacherName,
              fTeacherSurname: teacher.fTeacherSurname,
              fTeacherPhone: teacher.fTeacherPhone,
              fTeacherEmail: teacher.fTeacherEmail
            }
          })}
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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});