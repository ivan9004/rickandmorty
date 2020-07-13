import {createStore} from "redux";

const initialState  = {
        characters:[]
}

const reducer = (state = initialState,action) =>{
    return state
}

export default createStore(reducer)