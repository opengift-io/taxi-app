import React, { Component } from 'react';
import {
     StyleSheet,
      Text,
       View,
    TouchableOpacity
    } from 'react-native';

export default class TurnOnGeolocation extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.content}>
               <Text style={styles.title}>
               Geolocation
               </Text>
               <Text style={styles.desc}>
               Activate geolocation service to start working with the application
               </Text>
               <View style={styles.iconContainer}>
               </View>
               <TouchableOpacity
               onPress={()=>{
                this.props.navigation.navigate('uploadPhoto')
               }}
               activeOpacity={0.8}
               style={styles.button}
               >
               <Text style={styles.buttonText}>
                   Turn On
               </Text>
               </TouchableOpacity>
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3dc464',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        width: '100%',
alignItems: 'center',
paddingBottom: 100,
    },
    title:{
        color: '#fff',
        fontSize: 25,
        marginBottom: 15,
    },
    desc:{
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 30,
        color: '#fff',
        marginBottom: 25,
    },
    iconContainer:{
        height: 110,
        width: 110,
        backgroundColor: '#fff'
    },
    button:{
        marginTop: 25,
        height: 52,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 3
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
    }
});
