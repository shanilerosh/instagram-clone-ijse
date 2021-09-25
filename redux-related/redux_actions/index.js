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

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
                for(let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(following[i], true));
                }
            })
    })
}

export function fetchUsersData(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            if(getPosts){
                dispatch(fetchUsersFollowingPosts(uid));
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("user_posts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                const uid = snapshot.query._.C_.path.segments[1]
                const user = getState().usersState.users.find(el => el.uid === uid);


                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })

                for(let i = 0; i< posts.length; i++){
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })

            })
    })
}

export function fetchUsersFollowingLikes(uid, postId) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("user_posts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                const postId = snapshot.ZE.path.segments[3];

                let currentUserLike = false;
                if(snapshot.exists){
                    currentUserLike = true;
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
    })
}