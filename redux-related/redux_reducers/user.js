const initState = {
    currUser: null
}

/*Updating the user state by using the upcoming actions*/
export const user = (state=initState, action) => {
    return {
        ...state,
        currUser: action.currUser
    }
}