import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';

import TeacherListScreen from './screens/TeacherListScreen';
import TeacherDetailScreen from './screens/TeacherDetailScreen';
import TeacherFormScreen from './screens/TeacherFormScreen';
import TeacherCreateScreen from './screens/TeacherCreateScreen';

import LessonListScreen from './screens/LessonListScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import LessonFormScreen from './screens/LessonFormScreen';
import LessonCreateScreen from './screens/LessonCreateScreen';

import StudentListScreen from './screens/StudentListScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import StudentFormScreen from './screens/StudentFormScreen';
import StudentCreateScreen from './screens/StudentCreateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tutoring Center' }} />

        <Stack.Screen name="TeacherList" component={TeacherListScreen} options={{ title: 'Öğretmenler' }} />
        <Stack.Screen name="TeacherDetail" component={TeacherDetailScreen} options={{ title: 'Öğretmen Detayı' }} />
        <Stack.Screen name="TeacherForm" component={TeacherFormScreen} options={{ title: 'Öğretmen Formu' }} />
        <Stack.Screen name="TeacherCreate" component={TeacherCreateScreen} options={{ title: 'Yeni Öğretmen' }} />

        <Stack.Screen name="LessonList" component={LessonListScreen} options={{ title: 'Dersler' }} />
        <Stack.Screen name="LessonDetail" component={LessonDetailScreen} options={{ title: 'Ders Detayı' }} />
        <Stack.Screen name="LessonForm" component={LessonFormScreen} options={{ title: 'Ders Formu' }} />
        <Stack.Screen name="LessonCreate" component={LessonCreateScreen} options={{ title: 'Yeni Ders' }} />

	<Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Öğrenciler' }} />
	<Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Öğrenci Detayı' }} />
        <Stack.Screen name="StudentForm" component={StudentFormScreen} options={{ title: 'Öğrenci Formu' }} />
        <Stack.Screen name="StudentCreate" component={StudentCreateScreen} options={{ title: 'Yeni Öğrenci' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}