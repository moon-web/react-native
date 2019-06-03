/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Routers from './app/router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkRedux from 'redux-thunk'
import rootReducer from './app/reducers/rootReducer'

const createStoreWithMiddleware = applyMiddleware(thunkRedux)(createStore);
const initialState = {};
const store = createStoreWithMiddleware(rootReducer, initialState);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Provider store={store}>
        <Routers/>
      </Provider>
    );
  }
}
