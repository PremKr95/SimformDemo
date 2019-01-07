import React, { Component } from 'react'
import {View , FlatList , Platform , TouchableHighlight , TouchableNativeFeedback , Text , Dimensions , 
        TouchableOpacity , StatusBar , ActivityIndicator , Image , Share}  from 'react-native'
import apiCalls from './APICalls'
import utils from './Utils'
import commonStyles from './common/CommonStyles'
import color from './common/color'
var scrwidth=Dimensions.get('window').width
var scrheight=Dimensions.get('window').height
const cardHeight = scrheight*.15;

export default class VideoScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            videoData : '',
            videoDatas : '',
            refreshing: false,
            isLoading : true,
        }
    }

    componentDidMount(){
          this.fetchData()
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData()
    }

    fetchData=()=>{
        var mThis = this;
        var url = "https://private-c31a5-task27.apiary-mock.com/videos";    
        apiCalls.getVideosList(url,function(onSuccess){
            var data = JSON.parse(onSuccess._bodyText)
            mThis.setState({videoData : data.videos})
            mThis.setState({videoDatas : data.videos})
            mThis.setState({refreshing:false, isLoading:false})
        },function(onFailure){     
        })
    }

    handleMoreData=()=>{
        this.setState({videoDatas:this.state.videoDatas.concat(this.state.videoData)})
    }

    renderItem=(item)=>{
        if(Platform.OS == 'android'){
          return(
            <TouchableNativeFeedback onPress={()=>this.getItem(item)}>
                {this.commonView(item)}
            </TouchableNativeFeedback>
          )
        }else{
          return(
            <TouchableHighlight>
                {this.commonView(item)}
            </TouchableHighlight>
          )
        }
    }

    commonView=(item)=>{
      return(
        <View style={{
                        flex: 1,
                        height: cardHeight*3,
                        width:'90%',
                        alignSelf:'center',
                        flexDirection: 'column',
                        borderRadius: 8,
                        marginVertical: cardHeight*.05 , 
                        }} pointerEvents='box-only'>
            <View style={{backgroundColor:'#add8e6' , position:'absolute' , height:cardHeight*2 ,width:'100%' ,bottom:0 , borderRadius:12}}>
                        <Text style={{position:'absolute' , bottom : cardHeight*0.15 , alignSelf:'center' , fontSize : 20}}> {item.item.title} </Text>
            </View>  

            <View style={{height: cardHeight*2.5,
                        width:'90%',
                        alignSelf:'center',
                        flexDirection: 'column',
                        borderRadius: 8,
                        position:'absolute',
                        top :0,
                        borderRadius : 12 , 
                        marginVertical: cardHeight*.05 , }}> 
                  <Image style = {{flex:1 , borderRadius : 12 }} source={{uri : item.item.thumbnail_url}}/>
            </View>
                
        </View>
      )
    }
    
    getItem=(item)=>{
        Share.share(
            {
                message : item.item.video_url,
            }
        )
    }


    openProfile=()=>{
        var mThis = this
        this.props.navigation.navigate('Profile')
        // utils.forceLogout(mThis)
    }

    render() {
        return (
        <View style={commonStyles.container}>
                <StatusBar
                    backgroundColor={color.primaryColor}
                />
                <TouchableOpacity style={{height: 56,
                                            alignSelf: "center",
                                            width: "70%",
                                            margin:'2%',
                                            backgroundColor:'#a11c4a',
                                            borderRadius:28,
                                            justifyContent:'center',
                                            alignItems:'center',}}onPress={this.openProfile} >
                        <Text style={commonStyles.buttonText}>Go To Profile</Text>
                    </TouchableOpacity> 
                {this.state.isLoading && 
                    <ActivityIndicator size="large"
                        style={{alignSelf:'center' , flex:1}}
                    />                
                }    
                <FlatList
                    extraData={this.state}
                    style={{}}
                    data={this.state.videoDatas}
                    renderItem={this.renderItem}
                    keyExtractor = {(item, index) => index.toString()}
                    onEndReached={this.handleMoreData}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />   
        </View>
        )
    }
}
