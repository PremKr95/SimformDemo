import {StyleSheet} from 'react-native'
import color from './color'
const commonStyle = StyleSheet.create ({

    container : {
        backgroundColor:color.primaryColor, 
        flex:1
    } ,

    primaryImageView  : {
        alignSelf:'center',
        margin:'10%'
    },

    primaryTextInput : {
        width:'80%',
        alignSelf:'center',
        marginTop : 10
    },

    primaryButton : {
        height: 56,
        alignSelf: "center",
        width: "70%",
        backgroundColor:color.primaryButtonColor,
        borderRadius:28,
        justifyContent:'center',
        top :'20%',
        alignItems:'center',
    },

    buttonText : {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize:17,
        color:'#FFFFFF',
        fontWeight:"bold",
    }


})

export default commonStyle