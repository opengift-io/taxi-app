import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyApp from './views/app'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyApp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
