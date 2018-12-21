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
    Image,
    ImageBackground
} from 'react-native';
import CountryPicker from '../../components/react-native-country-picker-modal'

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
          
                <ImageBackground 
                source={require('../../assets/images/background.png')}
                style={styles.container}>
                  <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                    <View style={styles.shadowContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                activeOpacity={0.8}
                                style={styles.iconContainer}>
                                <Image
                                    style={{ width: 11, height: 20 }}
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
                        <Text style={{ color: '#2ecc71' }}> 9 </Text>
                            seconds
                        </Text>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        </Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        backgroundColor: '#2ecc71',
    },
    shadowContainer: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 15,
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        borderRadius: 4
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    headerText: {
        color: 'rgb(44, 62, 80)',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 31,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginRight: 16,
        textAlign: 'right',
        color: 'rgba(0,0,0,0.1)',
        textAlign: 'right',
    },
    numberText: {
        color: 'rgb(44, 62, 80)',
        marginLeft: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    input: {
        color: 'rgb(44, 62, 80)',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginRight: 16,
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginHorizontal: 20
    },
    codeInputContainer: {
        backgroundColor: '#fff',
        height: '100%',
        width: '40%',
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#2ecc71',
        height: '100%',
        width: '58%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '#fff'
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#ecf0f1',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    footerText: {
        color: 'rgb(189, 195, 199)',
    },
    iconContainer: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 10,
    },
    timerText: {
        fontFamily: 'Roboto-Regular',
        marginTop: 20,
        marginHorizontal: 40,
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'rgb(44, 62, 80)'
    }
});
