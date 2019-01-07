export const USER_DATA = 'USER_DATA'

export function setUserData(data){
    return{
        type : USER_DATA,
        payload : data
    }
}
