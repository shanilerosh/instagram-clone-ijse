import {CLEAR_DATA, USER_FOLLOWING_STATE_CHANGE, USER_HAS_CHANGED, USER_POST_HAS_CHANGED} from "../contants";

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
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following
            }
        case CLEAR_DATA:
            return initState
        default:
            return state;
    }


}