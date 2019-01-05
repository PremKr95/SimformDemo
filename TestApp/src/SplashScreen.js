import React, { Component } from 'react'
import {View , StatusBar} from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import utils from './Utils'
import {StackActions} from 'react-navigation'
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
      <View style={{backgroundColor:'red' , flex:1}}>
            <StatusBar
                backgroundColor='red'
            />
      </View>
    )
  }
}
