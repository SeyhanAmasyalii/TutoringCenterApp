import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { lessonService } from '../services/lessonService';

export default function LessonDetailScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const data = await lessonService.getLesson(lessonId);
      setLesson(data);
    } catch (error) {
      console.error('Ders bilgileri alınırken hata:', error);
      Alert.alert('Hata', 'Ders bilgileri alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Silme Onayı',
      'Bu dersi silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await lessonService.deleteLesson(lesson.fLessonId);
              Alert.alert('Başarılı', 'Ders başarıyla silindi.');
              navigation.navigate('LessonList');
            } catch (error) {
              console.error('Silme hatası:', error);
              Alert.alert('Hata', 'Ders silinirken bir hata oluştu.');
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

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ders bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ders Adı:</Text>
          <Text style={styles.value}>{lesson.fLessonName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Açıklama:</Text>
          <Text style={styles.value}>{lesson.fLessonDescription}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('LessonForm', { lesson })}
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
  infoContainer: { 
    padding: 20 
  },
  infoRow: { 
    flexDirection: 'row', 
    marginBottom: 10 
  },
  label: { 
    fontWeight: 'bold', 
    marginRight: 10 
  },
  value: { 
    flex: 1 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20, 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  updateButton: { 
    backgroundColor: '#4CAF50', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    flex: 1, 
    marginRight: 10 
  },
  deleteButton: { 
    backgroundColor: '#f44336', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    flex: 1 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  }
});