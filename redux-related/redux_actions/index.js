import firebase from "firebase";
import {USER_HAS_CHANGED} from "../contants";

export function fetchUser() {
    return((dispatch) => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot)=> {
                console.log('SnapShot===<',snapshot)
                if(snapshot.exists){
                    dispatch({type: USER_HAS_CHANGED, currUser: snapshot.data()})
                } else {
                    console.error('Error Exist')
                }
            })
    })
}