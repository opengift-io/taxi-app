import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Modal
} from 'react-native';
import LocationSwitch from 'react-native-location-switch';

export default class LocationEnable extends Component {
    constructor(props) {
        super(props)
    }

    onEnableLocationPress() {
        LocationSwitch.isLocationEnabled(
            () => {
                this.props.callback()
            },
            () => {
                LocationSwitch.enableLocationService(1000, true,
                    () => {
                        this.props.callback()
                    },
                    () => {
                        console.log('desabled');
                    },
                );
            },
        );
    }

    render() {
        return (<Modal
            animationType="fade"
            transparent={false}
            visible={this.props.modalVisible}
            onRequestClose={() => { }}>
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Geolocation
               </Text>
                    <Text style={styles.desc}>
                        Activate geolocation service to start working with the application
               </Text>
                    <View style={styles.iconContainer}>
                        <Image
                            style={{
                                flex: 1,
                                width: '100%'
                            }}
                            source={require('../../assets/images/nav.png')}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.onEnableLocationPress()
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Turn On
               </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.skipCallback()
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Skip
               </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Modal>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        marginBottom: 20,
    },
    desc: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 30,
        color: '#fff',
        marginBottom: 20,
    },
    iconContainer: {
        height: 80,
        width: 80,
    },
    button: {
        marginTop: 20,
        height: 40,
        width: 126,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
});
