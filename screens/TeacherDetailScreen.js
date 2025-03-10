import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { teacherService } from '../services/teacherService';
import { lessonService } from '../services/lessonService';
import { teacherLessonService } from '../services/teacherLessonService';

export default function TeacherDetailScreen({ route, navigation }) {
  const { teacherId } = route.params;
  const [teacher, setTeacher] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [assignedLessons, setAssignedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherAndLessons();
  }, []);

  const fetchTeacherAndLessons = async () => {
    try {
      setLoading(true);
      const teacherData = await teacherService.getTeacher(teacherId);
      setTeacher(teacherData);

      const [allLessonsData, assignedLessonsData] = await Promise.all([
        lessonService.getLessons(),
        teacherLessonService.getLessonsByTeacher(teacherId),
      ]);

      setAssignedLessons(assignedLessonsData);

      const unassignedLessons = allLessonsData.filter(
        (lesson) => !assignedLessonsData.some((assigned) => assigned.fLessonId === lesson.fLessonId)
      );
      setAllLessons(unassignedLessons);
    } catch (error) {
      console.error('Veriler alınırken hata:', error);
      Alert.alert('Hata', 'Bilgiler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignLesson = async (lesson) => {
    try {
      await teacherLessonService.assignTeacherToLesson({
        fTeacherId: teacherId,
        fLessonId: lesson.fLessonId,
      });

      setAssignedLessons((prev) => [...prev, lesson]);
      setAllLessons((prev) => prev.filter((l) => l.fLessonId !== lesson.fLessonId));

      Alert.alert('Başarılı', 'Ders öğretmene başarıyla atandı.');
    } catch (error) {
      console.error('Ders atama hatası:', error);
      Alert.alert('Hata', 'Ders atanırken bir hata oluştu.');
    }
  };

  const handleRemoveLesson = async (lesson) => {
    try {
      await teacherLessonService.removeTeacherFromLesson(lesson.teacherLessonId);

      setAllLessons((prev) => [...prev, lesson]);
      setAssignedLessons((prev) => prev.filter((l) => l.fLessonId !== lesson.fLessonId));

      Alert.alert('Başarılı', 'Ders öğretmenden başarıyla kaldırıldı.');
    } catch (error) {
      console.error('Ders kaldırma hatası:', error);
      Alert.alert('Hata', 'Ders kaldırılırken bir hata oluştu.');
    }
  };

  const handleDeleteTeacher = async () => {
    Alert.alert(
      'Silme Onayı',
      'Bu öğretmeni silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await teacherService.deleteTeacher(teacherId);
              Alert.alert('Başarılı', 'Öğretmen başarıyla silindi.');
              navigation.navigate('TeacherList');
            } catch (error) {
              console.error('Silme hatası:', error);
              Alert.alert('Hata', 'Öğretmen silinirken bir hata oluştu.');
            }
          },
        },
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
    <View style={styles.container}>
      {/* Öğretmen Bilgileri */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ad:</Text>
          <Text style={styles.value}>{teacher.fTeacherName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Soyad:</Text>
          <Text style={styles.value}>{teacher.fTeacherSurname}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{teacher.fTeacherPhone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.value}>{teacher.fTeacherEmail}</Text>
        </View>
      </View>

      {/* Ders Listeleri */}
      <View style={styles.lessonsContainer}>
        {/* Tüm Dersler */}
        <View style={styles.listBox}>
          <Text style={styles.listTitle}>Atanabilir Dersler</Text>
          <FlatList
            data={allLessons}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.lessonItem} onPress={() => handleAssignLesson(item)}>
                <Text style={styles.lessonName}>{item.fLessonName}</Text>
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.fLessonId}
          />
        </View>

        {/* Atanmış Dersler */}
        <View style={styles.listBox}>
          <Text style={styles.listTitle}>Atanmış Dersler</Text>
          <FlatList
            data={assignedLessons}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.lessonItem} onPress={() => handleRemoveLesson(item)}>
                <Text style={styles.lessonName}>{item.fLessonName}</Text>
                <Text style={styles.removeText}>-</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.fLessonId}
          />
        </View>
      </View>

      {/* İşlem Butonları */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('TeacherForm', { teacher })}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTeacher}>
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    flex: 1,
  },
  lessonsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  listBox: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    maxHeight: 300,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lessonName: {
    flex: 1,
    fontSize: 14,
  },
  addText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});