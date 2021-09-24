import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import UserLanding from "./components/user-auth/UserLanding";
import UserRegistration from "./components/user-auth/UserRegistration";
import UserLogin from "./components/user-auth/UserLogin";


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserLanding">
        <Stack.Screen name="UserLanding" component={UserLanding} options={{ headerShown: false }} />
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
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
