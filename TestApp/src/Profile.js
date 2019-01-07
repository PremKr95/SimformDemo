import React, { Component } from 'react'
import {View , Image , StatusBar , Text , TextInput , Dimensions , TouchableOpacity , ToastAndroid , Alert}  from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import utils from './Utils';
import {connect} from 'react-redux'
import commonStyles from './common/CommonStyles'
import color from './common/color'
import ImagePicker  from 'react-native-image-picker'
var scrheight = Dimensions.get('window')
var scrwidth = Dimensions.get('window')
var userDetails
var userEmail
var userName
var userPassword
class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            edit : false,
            name : '',
            password : '',
            imageSource : "",
        }
    }

    componentDidMount(){
        testAsyncStorage.getData(this.props.userData).then((value)=>{
            if(value === null){
                alert("Unable to fetch user data")
            }else{
                var data = JSON.parse(value)
                this.setState({name : data.name , password : data.password , imageSource : data.image})
                
            }
        })
    }

    saveUserData=()=>{
        // ToastAndroid.show('saveUserData Called')
        let userObj = {
            "name" : this.state.name,
            "email" : this.props.userData,
            "password" : this.state.password,
            "image" : this.state.imageSource
        }
        testAsyncStorage.saveData(this.props.userData , userObj)
        utils.finishActivity(this , 'VideoScreen' , null)
    }
    
    openImagePicker=()=>{
        
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true
            }
        }

        ImagePicker.showImagePicker(options , (response) => {
             if(response.didCancel){
                 console.log("User pressed the cancel button")
             }else if(response.error){
                 console.log("ImagePicker Error : " +response.error)   
                 if(Platform.OS == 'ios'){
                    Alert.alert(
                        'Please allow access',
                        'Please enable the camera access',
                        [
                            {text : 'OK' ,onPress:()=> console.log("OK Pressed")}
                        ],
                        {cancelable : false}
                    )
                 }

             }else{
                 source ={uri : response.uri}
                 selectedImagePath = response.uri
                 this.setState({imageSource : selectedImagePath})
             }
        })
    }

    render() {
        return (
        <View style={commonStyles.container}>
                <StatusBar
                    backgroundColor={color.primaryColor}
                />
                <TouchableOpacity disabled={this.state.edit} onPress={()=>this.openImagePicker()}>
                {this.state.imageSource == "" ? 
                ( <Image style={commonStyles.primaryImageView} source={require('../res/Image/user.png')} />) :
                  ( <Image style={{alignSelf:'center' , margin:'10%' , height:120 , width:120 , borderRadius :60}}
                        source={{uri : this.state.imageSource}}
                  /> ) 
                 }
                </TouchableOpacity>
                <TextInput style = {commonStyles.primaryTextInput}
                    label="Registered mobile number"
                    underlineColorAndroid='pink'
                    fontSize={17}
                    placeholder = 'full name'
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    editable={this.state.edit}
                    // value = {userName}
                    defaultValue = {this.state.name}
                    onChangeText = {(text)=> this.setState({name:text})}
                    />
                <TextInput style = {commonStyles.primaryTextInput}
                    label="Registered mobile number"
                    underlineColorAndroid='pink'
                    fontSize={17}
                    placeholder = 'password'
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    editable={this.state.edit}
                    // value = {userPassword}
                    defaultValue = {this.state.password}
                    onChangeText = {(text)=> this.setState({password:text})}
                    />
                 <TouchableOpacity disabled={this.state.edit} style={commonStyles.primaryButton} onPress={this.saveUserData} >
                    <Text style={commonStyles.buttonText}>SAVE</Text>
                </TouchableOpacity>  

                <View style = {{height:scrheight*0.1 , width:'100%' , position:'absolute' , bottom:0 , flexDirection:'row', justifyContent:'space-between',padding:'5%'}}>
                    <Text onPress={()=>this.setState({edit:true})} style={{color:'white',fontSize:16}}> Edit Profile</Text>
                    <Text style={{color:'white',fontSize:18}}> | </Text>
                    <Text onPress={()=>utils.forceLogout(this)} style={{color:'white',fontSize:16}}> Logout </Text>
                </View>
        </View>
        ) 
    }
}

function mapStateToProps(state){
    return {
        userData : state.userData
    }
}

export default connect(mapStateToProps)(Profile)