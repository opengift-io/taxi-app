import React, { Component } from 'react';
import MyApp from './views/app'
import { Provider } from "react-redux"
import store from './reducer/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
