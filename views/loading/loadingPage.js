import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Loading extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={styles.container}>
             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'silver'
    },
});
