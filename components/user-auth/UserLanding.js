import React from 'react';
import {Button, View} from "react-native";

function UserLanding(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title="Register"
                onPress={() => props.navigation.navigate("UserRegistration")} />
            <Button
                title="Login"
                onPress={() => props.navigation.navigate("UserLogin")} />
        </View>
    )
}

export default UserLanding;