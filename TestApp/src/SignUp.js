import React, { Component } from 'react'
import {View , StatusBar , Text , Dimensions , Image , TextInput , TouchableOpacity , Platform , Alert}   from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import utils from './Utils';
import ImagePicker  from 'react-native-image-picker'
var scrwidth=Dimensions.get('window').width
var scrheight=Dimensions.get('window').height
var selectedImagePath = ""
export default class SignUp extends Component {

    constructor(props){
        super(props)
        this.state = {
             name  :'',
             email :'',
             password:'',
             imageSource : ""
        }
    }

    registerUser=()=>{
        userObj = {
            "name" : this.state.name,
            "email" : this.state.email,
            "password" : this.state.password,
            "image" : this.state.imageSource
        }
        testAsyncStorage.saveData(this.state.email,userObj);
        this.props.navigation.navigate('Login');
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
        <View style={{backgroundColor:'red' , flex:1}}>
             <StatusBar 
                backgroundColor = 'red'
            />

            <View>
                <TouchableOpacity onPress={()=>this.openImagePicker()}>
                {this.state.imageSource == "" ? (
                    <Image style = {{alignSelf:'center',margin:'10%'}} source={require('../res/Image/user.png')}/>
                ) :
                (   <Image style = {{alignSelf:'center',margin:'10%' , height:100,width:100}} source={{uri : selectedImagePath}}/>
                )
                }
                </TouchableOpacity>
                <TextInput style = {{width:'80%',alignSelf:'center'}}
                   label="Registered mobile number"
                   underlineColorAndroid='pink'
                   fontSize={17}
                   placeholder = 'full name'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   onChangeText = {(text)=> this.setState({name:text})}
                   />
                   <TextInput style = {{width:'80%',alignSelf:'center'}}
                   label="Registered mobile number"
                   underlineColorAndroid='pink'
                   fontSize={17}
                   placeholder = 'email'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   onChangeText = {(text)=> this.setState({email:text})}
                   />
                   <TextInput style = {{width:'80%',alignSelf:'center'}}
                   label="Registered mobile number"
                   underlineColorAndroid='pink'
                   fontSize={17}
                   placeholder = 'password'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   secureTextEntry={true}
                   onChangeText = {(text)=> this.setState({password:text})}
                   />
                   <TouchableOpacity style={{height: 56,
                                        alignSelf: "center",
                                        width: "70%",
                                        backgroundColor:'#c21c4a',
                                        borderRadius:28,
                                        justifyContent:'center',
                                        alignItems:'center',}}onPress={this.registerUser} >
                    <Text style={{textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize:17,
                                    color:'#FFFFFF',
                                    fontWeight:"bold",}}>Register</Text>
                   </TouchableOpacity>
            </View>
            <View style={{position:'absolute',bottom:0 ,height:scrheight*.08 , width:'100%' , backgroundColor :'rgba(52 , 52 , 52 , 0.2)' , justifyContent:'center'}}>
                    <Text onPress={()=> utils.finishActivity(this , 'Login' , null) }style={{alignSelf:'center' , color:'white' ,fontSize:18}}> Cancel </Text>
            </View>
        </View>
    )
  }
}
