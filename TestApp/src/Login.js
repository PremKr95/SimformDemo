import React, { Component } from 'react'
import {View , StatusBar , Text , Dimensions , Image , TextInput , TouchableOpacity}  from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import  utils from './Utils'
var scrwidth=Dimensions.get('window').width
var scrheight=Dimensions.get('window').height

export default class Login extends Component {

constructor(props){
    super(props)
    this.state = {
        email : "",
        password : ""
    }
}

checkUserCredentials=()=>{
    // testAsyncStorage.clear()
    var mThis = this
    testAsyncStorage.getData(this.state.email).then((value)=>{
        if(value == null){
            alert("User doesn't exist.")
        } else{
            var userData = JSON.parse(value);
            var pass = userData.password;
            if(pass === this.state.password){
                testAsyncStorage.saveData('login', 'done');
                utils.finishActivity(mThis , 'VideoScreen',null)
            }else{
                alert("Credential Wrong")
            }
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
                <Image style = {{alignSelf:'center',margin:'10%'}} source={require('../res/Image/user.png')}/>
                <Text style = {{fontSize:40,color:'white',alignSelf:'center'}}> instan</Text>
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
                   secureTextEntry = {true}
                   onChangeText = {(text)=> this.setState({password:text})}
                />
                <TouchableOpacity style={{height: 56,
                                        alignSelf: "center",
                                        width: "70%",
                                        backgroundColor:'#c21c4a',
                                        borderRadius:28,
                                        justifyContent:'center',
                                        alignItems:'center',}}onPress={this.checkUserCredentials} >
                    <Text style={{textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize:17,
                                    color:'#FFFFFF',
                                    fontWeight:"bold",}}>Login</Text>
                </TouchableOpacity>            
            </View>
            <View style = {{height:scrheight*0.1 , width:'100%' , position:'absolute' , bottom:0 , flexDirection:'row', justifyContent:'space-between',padding:'5%'}}>
                <Text style={{color:'white',fontSize:16}}> Forgot Password </Text>
                <Text style={{color:'white',fontSize:18}}> | </Text>
                <Text onPress = {()=>utils.finishActivity(this , 'signUp' , null)} style={{color:'white',fontSize:16     , textDecorationLine :'underline'}}> Create an Account </Text>
            </View>
      </View>
    )
  }
}
