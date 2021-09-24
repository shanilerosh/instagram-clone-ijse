import {combineReducers} from "redux";
import {user} from "./user";

/*As we are using multiple reducers to update
* the state. We have to combine the reducers
* subsequently*/
const Reducers = combineReducers({
    userState: user
})

export default Reducers;