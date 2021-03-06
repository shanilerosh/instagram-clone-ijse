import React, {Component} from 'react'
import {Button, TextInput, View} from 'react-native'
import firebase from "firebase";

export class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /*As soon as we create a user that is reflected in the
                in the db */
                firebase.firestore().collection('users')
                    /*Getting the current users id from the
                    * auth instance*/
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        /*Params to be saved in the doc*/
                        name,
                        email,
                    })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}

export default UserRegistration