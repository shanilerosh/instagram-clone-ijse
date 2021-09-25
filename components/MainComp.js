import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser, fetchUsersPosts} from "../redux-related/redux_actions";
import Feed from "./main-screens/feed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddScreen from "./main-screens/AddScreen";
import ProfileScreen from "./main-screens/ProfileScreen";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

/*Initializing the bottom tab navigatror*/
const Tab = createMaterialBottomTabNavigator();


class MainComp extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUsersPosts();

    }

    render() {
        const {currUser} = this.props;
        console.log('Curr User ===>', currUser)



        return (
            <Tab.Navigator initialRouteName={"Feed"} labeled={false}>
                 <Tab.Screen name={"Feed"}  component={Feed}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="home" color = {color}
                            size={26} />
                        ),
                    }}/>
                {/*Man add does not have the bottom stack navigation so
                we are using a listner and nav to main add*/}
                <Tab.Screen name={"AddContainer"}  component={AddScreen}
                            listeners={({navigation}) => ({
                                tabPress: e=> {
                                    e.preventDefault();
                                    navigation.navigate("Add")
                                }
                            })}
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
    fetchUser,
    fetchUsersPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(MainComp);