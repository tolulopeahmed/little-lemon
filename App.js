import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
    <Stack.Navigator>
   
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Onboarding" component={Onboarding}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
