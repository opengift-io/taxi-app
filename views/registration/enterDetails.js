import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Keyboard,
    ScrollView,
    Dimensions,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';

export default class EnterDetails extends Component {
    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',

            nameVal: false,
            surnameVal: false,
            emailVal: false,
            passwordVal: false,
            redLineVelocity: false,

            loading: false
        }
    }

    emailValidation(text) {
        let val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (val.test(text)) {
            this.setState({
                email: text,
                emailVal: true
            })
        }
        else {
            this.setState({
                emailVal: false
            })
        }
    }

    nameValidation(text) {
        if (text.length >= 3) {
            this.setState({
                name: text,
                nameVal: true
            })
        }
        else {
            this.setState({
                nameVal: false
            })
        }
    }

    surnameValidation(text) {
        if (text.length >= 3) {
            this.setState({
                surname: text,
                surnameVal: true
            })
        }
        else {
            this.setState({
                surnameVal: false
            })
        }
    }

    passwordValidation(text) {
        if (text.length >= 8) {
            this.setState({
                password: text,
                passwordVal: true
            })
        }
        else {
            this.setState({
                passwordVal: false
            })
        }
    }

    registration(){
        this.setState({
            loading: true
        })
        const { params } = this.props.navigation.state
        let data = {
            firstname: this.state.name,
            lastname: this.state.surname,
            email: this.state.email,
            phone: params.callingCode + params.number,
            password: this.state.password
        }
        console.log(data);
        this.api.users('POST', data).then((res) => {
            console.log(res);
            this.setState({
                loading: false
            })
            if (res._status == 'OK') {
                this.props.navigation.navigate('chooseCity', params)
            }
            else if (res._issues.email) {
                Alert.alert(
                    '',
                    'Duplecate email !',
                    [
                        { text: 'Close', onPress: () => { }, style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            }
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    allValidation() {
        if (this.state.emailVal && this.state.nameVal && this.state.surnameVal && this.state.passwordVal) {
            this.registration()
        }
        else {
            this.setState({
                redLineVelocity: true
            })
        }
    }

    redLineVelocity(value) {
        if (!this.state.redLineVelocity) {
            return true
        }
        else {
            return value
        }
    }

    _renderLoading() {
        return this.state.loading ?
            (<View style={styles.loadingContainer}>
                <BarIndicator
                    count={7}
                    color='#3dc464' />
            </View>) :
            null
    }

    render() {

        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View style={styles.container}>
                        <View style={{ flex: 1, zIndex: 1 }}>
                            <View style={styles.shadowContainer}>
                                <View style={styles.header}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            this.props.navigation.goBack()
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.iconContainer}>
                                        <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../assets/icons/back.png')}
                                />
                                    </TouchableOpacity>
                                    <Text style={styles.headerText}>
                                        Welcome
                                </Text>
                                </View>
                                <Text style={styles.descText}>
                                    Enter your details to get started with the system
                        </Text>
                                <View style={[styles.inputContainer,
                                this.redLineVelocity(this.state.nameVal) ?
                                    { borderBottomColor: '#3dc464', } :
                                    { borderBottomColor: 'red', }
                                ]}>
                                    <TextInput
                                        onChangeText={(text) => {
                                            this.nameValidation(text)
                                        }}
                                        maxLength={10}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder='Name'
                                    />
                                </View>
                                <View style={[styles.inputContainer,
                                this.redLineVelocity(this.state.surnameVal) ?
                                    { borderBottomColor: '#3dc464', } :
                                    { borderBottomColor: 'red', }
                                ]}>
                                    <TextInput
                                        onChangeText={(text) => {
                                            this.surnameValidation(text)
                                        }}
                                        maxLength={15}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder='Surname'
                                    />
                                </View>
                                <View style={[styles.inputContainer,
                                this.redLineVelocity(this.state.emailVal) ?
                                    { borderBottomColor: '#3dc464', } :
                                    { borderBottomColor: 'red', }
                                ]}>
                                    <TextInput
                                        onChangeText={(text) => {
                                            this.emailValidation(text)
                                        }}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder='E-mail'
                                    />
                                </View>
                                <View style={[styles.inputContainer,
                                this.redLineVelocity(this.state.passwordVal) ?
                                    { borderBottomColor: '#3dc464', } :
                                    { borderBottomColor: 'red', }
                                ]}>
                                    <TextInput
                                        secureTextEntry={true}
                                        onChangeText={(text) => {
                                            this.passwordValidation(text)
                                        }}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder='Password'
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        this.allValidation()
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.nextButton}>
                                    <Text style={styles.nextButtonText}>
                                        Next Step
                            </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this._renderLoading()}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3dc464',
        height: Dimensions.get('window').height - StatusBar.currentHeight
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
    descText: {
        marginTop: 23,
        marginBottom: 12,
        paddingHorizontal: 25,
        fontSize: 22
    },
    nextButton: {
        marginTop: 8,
        alignSelf: 'center',
        backgroundColor: '#3dc464',
        height: 52,
        width: '58%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 17,
        height: 52,
        marginHorizontal: 25,
        borderBottomWidth: 2
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    nextButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
    },
    loadingContainer: {
        zIndex: 2,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
