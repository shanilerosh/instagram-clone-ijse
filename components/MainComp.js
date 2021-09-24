import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux-related/redux_actions";
import {Text, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

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
                <Tab.Screen name={"Feeds" }  />
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