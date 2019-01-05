/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import  { AsyncStorage } from 'react-native';

 class TestAsyncStorage{

  async saveData(key,value)
  {
    try {
      await AsyncStorage.setItem(key,JSON.stringify(value));
    } catch (error) {
      // Error saving data
      //alert(error);
    }
  }

  async getData(key)
  {
    try {
    const value = await AsyncStorage.getItem(key);
      //alert(value);
      return value;
    
    
    } catch (error) {
      // Error retrieving data
      // alert("user doesn't exist")
    }
  }

  async clear()
  {
    try {
    const value = await AsyncStorage.clear();
      //alert(value);
      return value;
    
    
    } catch (error) {
      // Error retrieving data
      //alert(error)
    }
  }

  async removeItem(key){
    try {
      const value =  await AsyncStorage.removeItem(key)
      return value
    } catch (error){
        alert(error)
    }
  }


}

const testAsyncStorage=new TestAsyncStorage()
export  default testAsyncStorage