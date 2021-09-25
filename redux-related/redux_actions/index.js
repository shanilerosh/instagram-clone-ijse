import firebase from "firebase";
import {USER_HAS_CHANGED, USER_POST_HAS_CHANGED} from "../contants";

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

export function fetchUsersPosts() {
    return((dispatch) => {
        firebase.firestore().collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("user_posts")
            /*Sort by ascending order*/
            .orderBy("creation","asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(document => {
                    const data =  document.data();
                    const id = document.id;
                    return {id, ...data}
                })
                console.log('Posts===>',posts)
                dispatch({type: USER_POST_HAS_CHANGED, posts})
            })
    })
}