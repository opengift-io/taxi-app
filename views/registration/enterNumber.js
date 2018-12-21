import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Alert,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import CountryPicker from '../../components/react-native-country-picker-modal'
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';
import { connect } from 'react-redux'
import { GoogleApi } from '../../networking/google.api'
import LocationSwitch from 'react-native-location-switch';

class EnterNumber extends Component {
    user = {}
    api = new API()
    alertVelosity = false

    constructor(props) {
        super(props)
        this.state = {
            cca2: 'US',
            callingCode: '',
            countries: [],
            number: '',
            count: 0,
            loading: true,
        }
    }


    componentDidMount() {
        this.getCountries()
    }

    getCountries() {
        this.api.countries().then((data) => {
            console.log(data);

            let arr = []
            idList = []
            for (let i = 0; i < data._items.length; i++) {
                arr.push(data._items[i].code.toUpperCase())
                idList.push(data._items[i]._id)
            }
            this.alertVelosity = false
            this.setState({
                idList: idList,
                countries: arr,
                loading: false,
                cca2: arr[0]
            })
        }).catch((error) => {
            console.log(error);

            if (!this.alertVelosity) {
                Alert.alert(
                    '',
                    'Server Error !',
                    [
                        { text: 'Close', onPress: () => { }, style: 'cancel' },
                    ],
                    { cancelable: false }
                )
                this.alertVelosity = true
            }
            this.getCountries()
        })
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

    _renderCountryPicker() {
        return this.state.countries.length == 0 ?
            null :
            (<CountryPicker
                countryList={this.state.countries}
                showCallingCode={true}
                closeable={true}
                onChange={(value) => {
                    this.setState({
                        callingCode: value.callingCode,
                        cca2: value.cca2,
                        activeCountryIndex: this.state.countries.indexOf(value.cca2)
                    });
                }}
                cca2={this.state.cca2}
                translation="eng"
            />)
    }

    next() {
        if (this.state.number.length >= 7) {
            this.setState({
                loading: true
            })
            this.getUser()
        }
        else {
            Alert.alert(
                '',
                'Short number !',
                [
                    { text: 'Close', onPress: () => { }, style: 'cancel' },
                ],
                { cancelable: false }
            )
        }

    }

    async setLogin() {
        try {
            await AsyncStorage.setItem('phone', this.state.callingCode + this.state.number);
        }
        catch (error) {
            console.log(error);

        }

    }

    getLocation(userInfo) {
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
                    this.props.dispatch({ type: 'SET_LOGIN', value: true })

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
        })
        this.getLocation(this.user)
    }

    async getCity() {
        try {
            let city = await AsyncStorage.getItem('city')
            return city
        }
        catch (error) {
            console.log(error);

        }
    }

    async setCity(city){
        try {
            await AsyncStorage.setItem('city', city)
        }
        catch (error) {
            console.log(error);

        }
    }

    skipCallback = () => {
        this.setState({
            loading: true
        })
        this.getCity().then((city)=>{
            console.log('--------------------------', city);
            
            if(city==null){
                this.props.dispatch({ type: 'SET_USER', value: this.user })
                this.props.navigation.navigate('chooseCity',{
                    countryId: this.state.idList[this.state.activeCountryIndex],
                    cca2: this.state.cca2,
                    callingCode: this.state.callingCode,
                    number: this.state.number,
                    login: true
                })
            }
            else{
                GoogleApi.getCityLocation(city).then((res) => {
                    console.log(res);
                    this.props.dispatch({
                        type: 'SET_FROM',
                        value: {
                            latitude: res.geometry.location.lat,
                            longitude: res.geometry.location.lng,
                            short_name: res.address_components[0].long_name,
                            address: res.address_components.formatted_address,
                            latitudeDelta: 0.06,
                            longitudeDelta: 0.06,
                            city: city
                        }
                    })
                    this.setCity(city).then(()=>{
                        this.props.dispatch({ type: 'SET_USER', value: this.user })
                    this.props.dispatch({ type: 'SET_LOGIN', value: true })
                    }).catch((error)=>{
                        console.log(error);
                        
                    })
                })
                    .catch((error) => {
                        console.log(error);

                    })
            }
        })
    }

    getUser() {
        this.api.users('GET', {}, this.state.callingCode + this.state.number).then((res) => {
            console.log(res);
            if (res._items.length > 0) {
                this.user = res._items[0]
                this.setLogin().then(() => {
                    LocationSwitch.isLocationEnabled(
                        () => {
                            this.getLocation(this.user)
                        },
                        () => {
                            this.skipCallback()
                        },
                    );
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
            else {
                this.setState({
                    loading: false
                })
                this.props.navigation.navigate('enterCode', {
                    countryId: this.state.idList[this.state.activeCountryIndex],
                    cca2: this.state.cca2,
                    callingCode: this.state.callingCode,
                    number: this.state.number
                })
            }
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

    render() {
        return (

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
                                <Text style={styles.headerText}>
                                    Enter your number
                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <View
                                    style={styles.codeContainer}>
                                    <Text style={styles.codeText}>
                                        {'+' + this.state.callingCode}
                                    </Text>
                                </View>
                                {this._renderCountryPicker()}
                                <TextInput
                                    onChangeText={(text) => {
                                        this.state.number = text
                                    }}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder='Phone number'
                                    keyboardType='numeric'
                                    maxLength={10}
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()

                                    }}
                                    style={styles.backButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.backButtonText}>
                                        Back
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        this.next()
                                    }}
                                    style={styles.nextButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.nextButtonText}>
                                        Next Step
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        </Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {this._renderLoading()}
            </ImageBackground >
        );
    }
}

export default connect()(EnterNumber)

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
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        color: 'rgb(44, 62, 80)',
    },
    inputContainer: {
        marginTop: 20,
        height: 31,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeContainer: {
        width: '25%'
    },
    codeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginRight: 16,
        textAlign: 'right',
        color: 'rgba(0,0,0,0.1)'
    },
    input: {
        color: 'rgb(44, 62, 80)',
        fontFamily: 'Roboto-Regular',
        flex: 1,
        height: 31,
        paddingVertical: 0,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginHorizontal: 20
    },
    backButton: {
        backgroundColor: '#fff',
        height: '100%',
        width: '40%',
        borderRadius: 4,
        borderColor: '#2ecc71',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(127, 140, 141)'
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
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#fff'
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#ecf0f1',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    footerText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(189, 195, 199)',
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
