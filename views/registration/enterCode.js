import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    TextInput,
    Alert,
    Image
} from 'react-native';
import CountryPicker from '../../components/react-native-country-picker-modal'
import SvgUri from 'react-native-svg-uri';

export default class EnterCode extends Component {
    code = '1111'

    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
    }

    next(params) {
        if (this.code == this.state.code) {
            this.props.navigation.navigate('enterDetails', params)
        }
        else {
            Alert.alert(
                '',
                'Wrong code !',
                [
                    { text: 'Close', onPress: () => { }, style: 'cancel' },
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        const { params } = this.props.navigation.state

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <View style={styles.container}>
                    <View style={styles.shadowContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                activeOpacity={0.8}
                                style={styles.iconContainer}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../assets/icons/back.png')}
                                />
                                {/* <SvgUri 
                                width="30"
                                 height="30" 
                                 source={require('../../assets/icons/taxi.svg')} /> */}
                            </TouchableOpacity>
                            <Text style={styles.headerText}>
                                Enter code
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.codeText}>
                                {'+' + params.callingCode}
                            </Text>
                            <CountryPicker
                                onChange={() => { }}
                                disabled={true}
                                showCallingCode={true}
                                closeable={true}
                                cca2={params.cca2}
                                translation="eng"
                            />
                            <Text
                                style={styles.numberText}
                            >
                                {params.number}
                            </Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View
                                style={styles.codeInputContainer}
                            >
                                <TextInput
                                    onChangeText={(text) => {
                                        this.state.code = text
                                    }}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder='Code'
                                    maxLength={4}
                                    keyboardType='numeric'
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    Keyboard.dismiss()
                                    this.next(params)
                                }}
                                style={styles.nextButton}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.nextButtonText}>
                                    Next Step
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.timerText}>
                            Hurry Up! New code will come after
                        <Text style={{ color: '#3dc464' }}> 9 </Text>
                            seconds
                        </Text>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        backgroundColor: '#3dc464',
    },
    shadowContainer: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 19,
        borderRadius: 5,
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 66,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerText: {
        fontSize: 25
    },
    inputContainer: {
        marginTop: 28,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        fontSize: 20,
        marginRight: 18,
        textAlign: 'right',
        color: 'rgba(0,0,0,0.1)'
    },
    numberText: {
        marginLeft: 16,
        fontSize: 20,
    },
    input: {
        textAlign: 'center',
        width: '100%',
        fontSize: 20,
    },
    buttonsContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        marginHorizontal: 25
    },
    codeInputContainer: {
        backgroundColor: '#fff',
        height: '100%',
        width: '40%',
        borderBottomColor: '#3dc464',
        borderBottomWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#3dc464',
        height: '100%',
        width: '58%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0,0,0,0.05)',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    footerText: {
        color: 'rgba(0,0,0,0.1)',
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
    },
    timerText: {
        marginTop: 20,
        marginHorizontal: 50,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
    }
});
