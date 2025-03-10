// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherListScreen from './screens/TeacherListScreen';
import TeacherDetailScreen from './screens/TeacherDetailScreen';
import TeacherFormScreen from './screens/TeacherFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TeacherList">
        <Stack.Screen
          name="TeacherList"
          component={TeacherListScreen}
          options={{ title: 'Öğretmenler' }}
        />
        <Stack.Screen
          name="TeacherDetail"
          component={TeacherDetailScreen}
          options={{ title: 'Öğretmen Detayı' }}
        />
        <Stack.Screen
          name="TeacherForm"
          component={TeacherFormScreen}
          options={{ title: 'Öğretmen Formu' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}