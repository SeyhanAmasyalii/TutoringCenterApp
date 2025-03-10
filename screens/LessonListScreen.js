import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { lessonService } from '../services/lessonService';
import { useIsFocused } from '@react-navigation/native';

export default function LessonListScreen({ navigation }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  
  const fetchLessons = async () => {
    setLoading(true);
    try {
      const data = await lessonService.getLessons();
      setLessons(data);
    } catch (error) {
      console.error('Dersler getirilirken hata:', error);
      alert('Dersler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchLessons();
    }
  }, [isFocused]);

  const handleDelete = async (lessonId) => {
    try {
      await lessonService.deleteLesson(lessonId);
      alert('Ders başarıyla silindi!');
      fetchLessons();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Ders silinirken hata oluştu.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={() => navigation.navigate('LessonDetail', { lessonId: item.fLessonId })}
      >
        <Text style={styles.itemText}>{item.fLessonName}</Text>
        <Text style={styles.descriptionText}>{item.fLessonDescription}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('LessonForm', { lesson: item })}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.fLessonId)}
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
        onPress={() => navigation.navigate('LessonCreate')}
      >
        <Text style={styles.createButtonText}>Ders Oluştur</Text>
      </TouchableOpacity>

      {lessons.length === 0 ? (
        <Text style={styles.noDataText}>Henüz ders kayıtları bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.fLessonId}
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
    elevation: 2
  },
  nameContainer: {
    marginBottom: 10
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    marginRight: 10
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
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
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
  }
});