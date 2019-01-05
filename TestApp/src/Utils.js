import {StackActions , NavigationActions} from 'react-navigation'
import testAsyncStorage from './TestAsyncStorage'
class Utils {

    getDataBeforeClear(callBack){
        let obj ={}
        testAsyncStorage.getData('login').then((value)=>{
            obj['login'] = value
            callBack(obj)
        })
    }

    setDataBeforeClear(login_){
        if(login_!=null && login_ != undefined){
            testAsyncStorage.saveData('login',login_)
        }
    }

    forceLogout(context){
            testAsyncStorage.removeItem('login').then((value)=>{
                console.log("after clearing all keys : " + value);
                let resetAction = StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [NavigationActions.navigate({ routeName: 'Login'})],
                  });
                 context.props.navigation.dispatch(resetAction);
                //  onSuccess("success");            
        })
    }

    finishActivity(context , activityName ,myProps , myKey){
        let resetAction = StackActions.reset({
            index: 0,
            key: myKey,
            actions: [NavigationActions.navigate({ routeName: activityName , params:myProps})],
        });
        return context.props.navigation.dispatch(resetAction);
    }
}

 const utils = new Utils()
 export default utils