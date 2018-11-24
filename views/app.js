import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RegistrationNavigator } from './registration'

export default class MyApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RegistrationNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
