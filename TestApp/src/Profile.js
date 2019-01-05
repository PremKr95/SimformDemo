import React, { Component } from 'react'
import {View , Image , StatusBar , Text , TextInput , Dimensions} from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
var scrheight = Dimensions.get('window')
var scrwidth = Dimensions.get('window')
export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            edit : false
        }
    }

    componentDidMount(){
    }

    
    render() {
        return (
        <View style={{backgroundColor:'red',flex:1}}>
                <StatusBar
                    backgroundColor='red'
                />
                <Image style={{alignSelf:'center' , margin:'10%'}} source={require('../res/Image/user.png')}
                />

                <TextInput style = {{width:'80%',alignSelf:'center'}}
                    label="Registered mobile number"
                    underlineColorAndroid='pink'
                    fontSize={17}
                    placeholder = 'full name'
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    editable={this.state.edit}
                    onChangeText = {(text)=> this.setState({name:text})}
                    />
                <TextInput style = {{width:'80%',alignSelf:'center'}}
                    label="Registered mobile number"
                    underlineColorAndroid='pink'
                    fontSize={17}
                    placeholder = 'email'
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    editable={this.state.edit}
                    onChangeText = {(text)=> this.setState({email:text})}
                />

                <View style = {{height:scrheight*0.1 , width:'100%' , position:'absolute' , bottom:0 , flexDirection:'row', justifyContent:'space-between',padding:'5%'}}>
                    <Text onPress={()=>this.setState({edit:true})} style={{color:'white',fontSize:16}}> Edit Profile</Text>
                    <Text style={{color:'white',fontSize:18}}> | </Text>
                    <Text style={{color:'white',fontSize:16     , textDecorationLine :'underline'}}> Logout </Text>
                </View>
        </View>
        )
    }
}
