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
    Image,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';
import { GoogleApi } from '../../networking/google.api'
import { connect } from 'react-redux'
import LocationEnable from './locationEnableModal'

class EnterDetails extends Component {
    user = {}
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

            loading: false,
            locationModalVisible: false
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

    async setLogin(number) {
        try {
            await AsyncStorage.setItem('phone', number);
        }
        catch (error) {
            console.log(error);

        }

    }

    skipCallback = () => {
        const { params } = this.props.navigation.state
        this.props.dispatch({ type: 'SET_USER', value: this.user })
        this.setState({
            locationModalVisible: false,
            loading: false
        })
        this.props.navigation.navigate('chooseCity', params)
    }

    getLocation(userInfo) {
        const { params } = this.props.navigation.state
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                GoogleApi.getPlace({
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }).then(responseJson => {
                    this.props.dispatch({
                        type: 'SET_FROM',
                        value: {
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            short_name: responseJson[0].address_components[1].short_name,
                            address: responseJson[0].formatted_address,
                            latitudeDelta: 0.06,
                            longitudeDelta: 0.06,
                            city: responseJson[2].address_components[2].long_name
                        }
                    })
                    this.props.dispatch({ type: 'SET_USER', value: userInfo })
                    this.setState({
                        loading: false
                    })
                    this.props.navigation.navigate('chooseCity', {
                        ...params,
                        city: responseJson[2].address_components[2].long_name
                    })
                })
                    .catch(error => {
                        console.error(error);
                    });
            },
            (error) => {
                console.log('error');
                this.getLocation(userInfo)
                console.log(error);
            },
            { enableHighAccuracy: false }
        );
    }

    locationModalCallback = () => {
        this.setState({
            locationModalVisible: false
        })
        this.getLocation(this.user)
    }

    getUser(phone) {
        this.api.users('GET', {}, phone).then((res) => {
            console.log(res);
            this.user = res._items[0]
            this.setState({
                locationModalVisible: true
            })
        })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                })
                Alert.alert(
                    '',
                    'Server Error !',
                    [
                        { text: 'Close', onPress: () => { }, style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            })
    }

    registration() {
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
            if (res._status == 'OK') {
                this.setLogin(params.callingCode + params.number).then(() => {
                    this.getUser(params.callingCode + params.number)
                }).catch((error) => {
                    console.log(error);

                })
            }
            else if (res._issues.email) {
                this.setState({
                    loading: false
                })
                Alert.alert(
                    '',
                    'Duplecate email !',
                    [
                        { text: 'Close', onPress: () => { }, style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            }
        }).catch((error) => {
            this.setState({
                loading: false
            })
            Alert.alert(
                '',
                'Server Error !',
                [
                    { text: 'Close', onPress: () => { }, style: 'cancel' },
                ],
                { cancelable: false }
            )
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
                    color='#2ecc71' />
            </View>) :
            null
    }

    render() {

        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
            >
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss()
                        }}
                    >
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
                                            style={{ width: 11, height: 20 }}
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
                                    { borderBottomColor: '#2ecc71', } :
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
                                    { borderBottomColor: '#2ecc71', } :
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
                                    { borderBottomColor: '#2ecc71', } :
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
                                    { borderBottomColor: '#2ecc71', } :
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
                    </TouchableWithoutFeedback>
                    {this._renderLoading()}
                    <LocationEnable
                        modalVisible={this.state.locationModalVisible}
                        callback={this.locationModalCallback}
                        skipCallback={this.skipCallback}
                    />
                </ImageBackground>
            </ScrollView>
        );
    }
}

export default connect()(EnterDetails)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2ecc71',
        height: Dimensions.get('window').height - StatusBar.currentHeight
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
    descText: {
        marginTop: 20,
        marginBottom: 12,
        paddingHorizontal: 20,
        color: 'rgb(44, 62, 80)',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    nextButton: {
        marginTop: 8,
        alignSelf: 'center',
        backgroundColor: '#2ecc71',
        height: 40,
        width: 140,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10,
        height: 52,
        marginHorizontal: 20,
        borderBottomWidth: 2
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'rgb(44, 62, 80)',
        fontFamily: 'Roboto-Regular',
    },
    nextButtonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '#fff'
    },
    iconContainer: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
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
