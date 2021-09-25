import React, {Component} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import UserLanding from "./components/user-auth/UserLanding";
import UserRegistration from "./components/user-auth/UserRegistration";
import UserLogin from "./components/user-auth/UserLogin";
import firebase from "firebase";
import {Text, View} from "react-native";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import MainComp from "./components/MainComp";
import {Provider} from "react-redux";
import rootReducer from './redux-related/redux_reducers';
import AddScreen from "./components/main-screens/AddScreen";


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

if (0 === firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

/*Creating the redux store in order to access it
* throught the system*/
const store = createStore(rootReducer, applyMiddleware(thunk))


class App extends Component {
    /*Required states for the app component is loaded here*/
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLogged: false,
        }
    }

    componentDidMount() {
        /*Making sure if the auth is changed the app should get logged
        * out and subsequent screen must be loaded*/
        this.setState({isLogged: false})
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    isLogged: false,
                    isLoaded: true,
                })
            } else {
                this.setState({
                    isLogged: true,
                    isLoaded: true,
                })
            }
        })
    }

    render() {
        if(!this.state.isLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            )
        }
        if(!this.state.isLogged) {
            return (<NavigationContainer>
                    <Stack.Navigator initialRouteName="UserLanding">
                        <Stack.Screen name="UserLanding" component={UserLanding} options={{headerShown: false}}/>
                        <Stack.Screen name="UserRegistration" component={UserRegistration}/>
                        <Stack.Screen name="UserLogin" component={UserLogin}/>
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            /*Passing the store data to the component to access
            the global state*/
            <Provider store={store}>
                <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainComp} options={{headerShown: false}}/>
                    <Stack.Screen name="Add" component={AddScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
        )

    }
}

export default App;