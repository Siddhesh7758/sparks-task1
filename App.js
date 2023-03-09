import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogin from './screens/GoogleLogin';

export default function App() {
  return (
    <View className='flex-1 justify-center items-center'>
      <GoogleLogin />
    </View>
  );
}

