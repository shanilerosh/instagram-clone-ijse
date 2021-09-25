import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux-related/redux_actions";
import {Text, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Feed from "./main-screens/feed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddScreen from "./main-screens/AddScreen";
import ProfileScreen from "./main-screens/ProfileScreen";

/*Initializing the bottom tab navigatror*/
const Tab = createBottomTabNavigator();


class MainComp extends Component {

    componentDidMount() {
        this.props.fetchUser();

    }

    render() {
        const {currUser} = this.props;
        console.log('Curr User ===>', currUser)



        return (
            <Tab.Navigator>
                 <Tab.Screen name={"Feed"}  component={Feed}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="home" color = {color}
                            size={26} />
                        ),
                    }}/>
                <Tab.Screen name={"Add"}  component={AddScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name="plus-box" color = {color}
                                                            size={26} />
                                ),
                            }}/>
                <Tab.Screen name={"Profile"}  component={ProfileScreen}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name="account-circle" color = {color}
                                                            size={26} />
                                ),
                            }}/>
            </Tab.Navigator>
        );
    }

}


const mapStateToProps = (store) => ({
    currUser: store.userState.currUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(MainComp);