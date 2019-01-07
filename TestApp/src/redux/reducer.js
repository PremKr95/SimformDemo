import {USER_DATA} from './action'

const initialState = {
    userData : ''
}

const reducer = (state =  initialState , action) => {
    
    switch(action.type){
        case USER_DATA :
                return {
                    ...state,
                    userData : action.payload
                }
            default :
                return state
    }
}

export default reducer

