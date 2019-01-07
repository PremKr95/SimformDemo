/** @format */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import RootStack from './src/RootStack';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'

import configureStore from './src/redux/store'
const store = configureStore()

export class TestApp extends Component {

    constructor(props) {
        super(props);
    } 

  render() {
    return(
      // <Provider> allows us to access the store for dispatching actions and receiving data from
      // the state in it's children i.e. <App/i>
      <Provider store={store}>
        <RootStack/>
      </Provider>
    )
}
}
AppRegistry.registerComponent(appName, () => TestApp)
