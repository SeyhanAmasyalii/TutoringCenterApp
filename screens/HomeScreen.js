import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TeacherList')}
      >
        <Text style={styles.buttonText}>Öğretmenler</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('LessonList')}
      >
        <Text style={styles.buttonText}>Dersler</Text>
      </TouchableOpacity>

      {/* Yeni eklenen Öğrenciler butonu */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('StudentList')}
      >
        <Text style={styles.buttonText}>Öğrenciler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});