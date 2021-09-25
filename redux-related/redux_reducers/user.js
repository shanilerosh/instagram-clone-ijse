import {USER_HAS_CHANGED, USER_POST_HAS_CHANGED} from "../contants";

const initState = {
    currUser: null,
    posts: []
}

/*Updating the user state by using the upcoming actions*/
export const user = (state=initState, action) => {
    switch(action.type) {
        case USER_HAS_CHANGED:
            return {
                ...state,
                currUser: action.currUser
            }
        case USER_POST_HAS_CHANGED:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state;
    }


}