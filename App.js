import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import UserLanding from "./components/user-auth/UserLanding";
import UserRegistration from "./components/user-auth/UserRegistration";
import UserLogin from "./components/user-auth/UserLogin";
import firebase from "firebase";


const Stack = createNativeStackNavigator();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnsg8QH7XaxwMRhzEh-uR7pJp_VkShV3s",
    authDomain: "instagram-clone-v1-4c4fb.firebaseapp.com",
    projectId: "instagram-clone-v1-4c4fb",
    storageBucket: "instagram-clone-v1-4c4fb.appspot.com",
    messagingSenderId: "1074048853924",
    appId: "1:1074048853924:web:82ae0971a972647ccbc331",
    measurementId: "G-7PX9PVYTEN"
};

if(0 === firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


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

