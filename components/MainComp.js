import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux-related/redux_actions";

class MainComp extends Component {

    componentDidMount() {
        this.props.fetchUser();

    }

    render() {
        const {currUser} = this.props;
        console.log('Curr User ===>', currUser)
        return (
            <div>

            </div>
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