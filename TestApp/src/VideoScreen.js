import React, { Component } from 'react'
import {View , FlatList , Platform , TouchableHighlight , TouchableNativeFeedback , Text , Dimensions , 
        TouchableOpacity , StatusBar , ActivityIndicator , Image , Share}  from 'react-native'
import apiCalls from './APICalls'
import utils from './Utils'
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
        <View style={{backgroundColor:'grey',
                        flex: 1,
                        height: cardHeight,
                        width:'90%',
                        alignSelf:'center',
                        flexDirection: 'row',
                        borderRadius: 8,
                        paddingVertical: cardHeight*.05,
                        paddingLeft: cardHeight*.1,
                        paddingRight:cardHeight*.1,
                        marginVertical: cardHeight*.05}} pointerEvents='box-only'>
                <Image style = {{flex:1}} source={{uri : item.item.thumbnail_url}}/>
        </View>
      )
    }
    
    getItem=(item)=>{
        Share.share(
            {
                title : item.item.title,
                message : item.item.video_url,
                // url : item.item.video_url
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
      <View style={{backgroundColor:'red' , flex:1}}>
            <StatusBar
                backgroundColor='red'
            />
            <TouchableOpacity style={{height: 56,
                                        alignSelf: "center",
                                        width: "70%",
                                        margin:'2%',
                                        backgroundColor:'#c21c4a',
                                        borderRadius:28,
                                        justifyContent:'center',
                                        alignItems:'center',}}onPress={this.openProfile} >
                    <Text style={{textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize:17,
                                    color:'#FFFFFF',
                                    fontWeight:"bold",}}>Go To Profile</Text>
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
