import React, { Component } from 'react'
import {View , StatusBar , Image ,Text} from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import utils from './Utils'
import {StackActions} from 'react-navigation'
import commonStyles from './common/CommonStyles'
import color from './common/color'
export default class SplashScreen extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    var mThis = this;
    setTimeout(()=>{
      testAsyncStorage.getData('login').then((isLoginDone)=>{
        if(isLoginDone != null){
          utils.finishActivity(mThis, 'VideoScreen' , null)
        }else{
          utils.finishActivity(mThis, 'Login' , null , null)
        }
    })
    },2000)     
  }

  render() {
    return (
      <View style={[commonStyles.container,{justifyContent:'center'}]}>
            <StatusBar
                backgroundColor= {color.primaryColor}
            />
            <View style={{alignSelf:'center'}}>
            <Image style = {{}} source={require('../res/Image/alert.png')}/>
            <Text style = {{fontSize:40,color:'white',alignSelf:'center'}}> instan</Text>
            </View>
      </View>
    )
  }
}
