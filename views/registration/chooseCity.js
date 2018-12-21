import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert,
    AsyncStorage
} from 'react-native';
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators'
import { GoogleApi } from '../../networking/google.api'
import { connect } from 'react-redux'

class ChooseCity extends Component {
    api = new API()
    alertVelosity = false

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            items: [],
            city: ''
        }
    }

    componentDidMount() {
        this.getcities()
    }

    // getPlace(id) {
    //     GoogleApi.getLocationFromID(id).then((res) => {
    //         console.log(res);
    //         console.log('sadddddddddddddddddddddddddddddddddddddddddddddddddddddd');
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }


    async setCity() {
        try {
            await AsyncStorage.setItem('city', this.state.city)
        }
        catch (error) {
            console.log(error);

        }
    }

    next() {
        const { params } = this.props.navigation.state

        GoogleApi.getCityLocation(this.state.city).then((res) => {
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
                    city: this.state.city
                }
            })
            this.setCity().then(() => {
                if (params.login) {
                    this.props.dispatch({ type: 'SET_LOGIN', value: true })
                }
                else {
                    this.props.navigation.navigate('uploadPhoto')
                }
            }).catch((error) => {
                console.log(error);

            })
        })
            .catch((error) => {
                console.log(error);

            })
    }

    getcities() {
        const { params } = this.props.navigation.state
        //5bf1aaf9af959e02a4f49782

        this.api.cities(params.countryId, 1, '').then((res) => {
            console.log(res);
            this.alertVelosity = false
            this.setState({
                items: res._items,
                loading: false,
                city: params.city ? params.city : res._items[0].title
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
            this.getcities()
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

    selectCity = (city) => {
        this.setState({
            city: city
        })
    }

    render() {
        const { params } = this.props.navigation.state

        return (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Choose a city
                </Text>
                    <View style={styles.iconContainer}>
                        <Image
                            style={{
                                height: 80,
                                width: 53
                            }}
                            source={require('../../assets/images/marker.png')}
                        />
                    </View>
                    <Text style={styles.cityText}>
                        {this.state.city}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.next()
                        }}
                        activeOpacity={0.8}
                        style={styles.nextButton}>
                        <Text
                            style={styles.nextButtonText}
                        >
                            Next Step
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('citiesList',
                                {
                                    items: this.state.items,
                                    selectCity: this.selectCity,
                                    ...params
                                }
                            )
                        }}
                        activeOpacity={0.8}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Change
                </Text>
                    </TouchableOpacity>
                </View>
                {this._renderLoading()}
            </ImageBackground>
        );
    }
}

export default connect()(ChooseCity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        marginBottom: 22,
        color: 'rgb(44, 62, 80)',
    },
    iconContainer: {
        alignItems: 'center',
        height: 80,
        width: 80,
    },
    cityText: {
        color: 'rgb(44, 62, 80)',
        fontSize: 24,
        marginTop: 9,
        marginBottom: 20
    },
    button: {
        marginVertical: 20,
        height: 30,
        width: 98,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2ecc71',
        borderWidth: 2
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgb(44, 62, 80)',
    },
    nextButton: {
        height: 30,
        width: 98,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    nextButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#fff'
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
