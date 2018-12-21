import React, { Component } from 'react';
import {
    AsyncStorage,
    View,
    StyleSheet,
    Alert
} from 'react-native'
import { RegistrationNavigator } from './registration'
import Drawer from '../routes/mainDrawerNavigation'
import Loading from './loading/loadingPage'
import { connect } from 'react-redux';
import { GoogleApi } from '../networking/google.api'
import API from '../networking/api'
import LocationSwitch from 'react-native-location-switch';
//import LocationEnable from './registration/locationEnableModal'

class MyApp extends Component {
    phone = ''
    api = new API()
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            //locationModalVisible: false
        }
    }

    componentDidMount() {
        this.startWork()
    }

    getUser(phone) {
        this.api.users('GET', {}, phone).then((res) => {
            console.log(res);

            this.props.dispatch({ type: 'SET_USER', value: res._items[0] })
            this.props.dispatch({ type: 'SET_LOGIN', value: true })
            this.setState({
                loaded: true
            })
        })
            .catch((error) => {
                console.log(error);
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

    async setCity(city) {
        try {
            await AsyncStorage.setItem('city', city)
        }
        catch (error) {
            console.log(error);

        }
    }

    setLocation(city, phone) {
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
            this.getUser(phone)
        })
            .catch((error) => {
                console.log(error);

            })
    }

    startWork() {
        this.getLogin().then(({ phone, city }) => {
            console.log(phone);
            this.phone = phone
            if (phone == null) {
                this.setState({
                    loaded: true
                })
            }
            else {
                LocationSwitch.isLocationEnabled(
                    () => {
                        this.getLocation(phone)
                    },
                    () => {
                        if (city == null) {
                            this.setLocation('Washington', phone)
                        }
                        else {
                            this.setLocation(city, phone)
                        }
                    },
                );

            }
        })
            .catch((error) => {
                console.log(error);
            })
    }

    async getLogin() {
        try {
            let phone = await AsyncStorage.getItem('phone')
            let city = await AsyncStorage.getItem('city')
            return { phone, city }
        }
        catch (error) {
            console.log(error);

        }
    }

    // locationModalCallback = () => {
    //     this.setState({
    //         locationModalVisible: false
    //     })
    //     this.getLocation(this.phone)
    // }

    getLocation(phone) {
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
                    console.log(responseJson);

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
                    this.getUser(phone)
                })
                    .catch(error => {
                        console.error(error);
                    });
            },
            (error) => {
                console.log('error');
                this.getLocation(phone)
                console.log(error);
            },
            { enableHighAccuracy: false }
        );
    }

    render() {
        if (!this.state.loaded) {
            return (<View style={styles.container}>
                <Loading />
                {/* <LocationEnable
                    modalVisible={this.state.locationModalVisible}
                    callback={this.locationModalCallback}
                /> */}
            </View>)
        }
        if (this.props.config.login) {
            return (<Drawer />)
        }
        else {
            return (<RegistrationNavigator />)
        }
    }
}

export default connect(
    ({ config }) => ({ config })
)(MyApp)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})