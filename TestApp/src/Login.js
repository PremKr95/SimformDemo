import React, { Component } from 'react'
import {View , StatusBar , Text , Dimensions , Image , TextInput , TouchableOpacity}  from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import  utils from './Utils'
import {connect} from 'react-redux'
import {setUserData} from './redux/action'
import commonStyles from './common/CommonStyles'
import color from './common/color'
var scrwidth=Dimensions.get('window').width
var scrheight=Dimensions.get('window').height

class Login extends Component {

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
                mThis.props.setUserData(this.state.email)
                utils.finishActivity(mThis , 'VideoScreen',null)
            }else{
                alert("Credential Wrong")
            }
        }
    })
}

// #a11c4a #c21c4a
  render() {
    return (
      <View style={commonStyles.container}>
            <StatusBar 
                backgroundColor = {color.primaryColor}
            />

            <View>
                <Image style = {commonStyles.primaryImageView} source={require('../res/Image/alert.png')}/>
                <Text style = {{fontSize:40,color:'white',alignSelf:'center'}}> instan</Text>
                <TextInput style = {commonStyles.primaryTextInput}
                   label="Registered mobile number"
                   underlineColorAndroid='pink'
                   fontSize={17}
                   placeholder = 'email'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   onChangeText = {(text)=> this.setState({email:text})}
                   />
                <TextInput style = {commonStyles.primaryTextInput}
                   label="Registered mobile number"
                   underlineColorAndroid='pink'
                   fontSize={17}
                   placeholder = 'password'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   secureTextEntry = {true}
                   onChangeText = {(text)=> this.setState({password:text})}
                />
                <TouchableOpacity style={commonStyles.primaryButton}onPress={this.checkUserCredentials} >
                    <Text style={commonStyles.buttonText}>Login</Text>
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

const mapStateToProps = state => ({})


function mapDispatchToProps(dispatch){
    return {
        setUserData : (data) => dispatch(setUserData(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)