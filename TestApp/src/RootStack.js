import {StackNavigator} from 'react-navigation'
import Login from './Login'
import signUp from './SignUp'
import VideoScreen from './VideoScreen'
import SplashScreen from './SplashScreen'
import Profile from './Profile'
const RootStack = StackNavigator(
    {
        Login :{
            screen : Login,
            navigationOptions: {
                header: null
            }
        },
        
        signUp :{
            screen : signUp,
            navigationOptions: {
                header: null
            }
        },

        VideoScreen :{
            screen : VideoScreen,
            navigationOptions:{
                header:null
            }
        },

        SplashScreen :{
            screen : SplashScreen,
            navigationOptions :{
                header:null
            }
        },
        
        Profile :{
            screen : Profile,
            navigationOptions:{
                header:null
            }
        }
        
    },
    {
        initialRouteName:'SplashScreen'
    }
)

export default RootStack