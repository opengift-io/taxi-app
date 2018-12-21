import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Keyboard
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ModalController } from './orderModals'
import { connect } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApi } from '../../networking/google.api'

class HomeClass extends Component {
    marginAnim = new Animated.Value(Dimensions.get('window').height - 62)
    modalController = null
    API_KEY = "AIzaSyAZyt6rmlKXP13D0UMjD2WQw-GXzihWgfM"

    constructor(props) {
        super(props)
        this.state = {
            to: {},
            modalControllerVisible: true,
            keyboardHeight: 0
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShowListener,
        );
        this.keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardHideListener,
        );
    }
    keyboardDidShowListener = e => {
        this.setState({
            keyboardHeight: e.endCoordinates.height,
        });
    };

    keyboardHideListener = () => {
        this.setState({
            keyboardHeight: 0,
        });
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardHideListener.remove();
    }

    setTo = (to) => {
        this.setState({
            to: to
        })
        if (to.latitude) {
            this.map.fitToCoordinates(
                [
                    {
                        latitude: this.props.map.from.latitude,
                        longitude: this.props.map.from.longitude
                    },
                    {
                        latitude: to.latitude,
                        longitude: to.longitude
                    },
                ],
                {
                    edgePadding: { top: 140, right: 100, bottom: 750, left: 100 },
                    animated: true
                }
            )
        }
    }

    animateToCoordinate = (from) => {
        this.map.animateToCoordinate({
            latitude: from.latitude,
            longitude: from.longitude
        }, 500)
    }

    marginAnimation(value) {
        Animated.timing(this.marginAnim, {
            toValue: value,
            duration: 100
        }).start(() => {

        })
    }

    _renderModalController() {
        return <Animated.View
            style={{
                marginTop: this.marginAnim
            }}
        >
            <View style={{
                marginTop: -this.state.keyboardHeight
            }}>
                <ModalController
                    setTo={this.setTo}
                    animateToCoordinate={this.animateToCoordinate}
                />
            </View>
        </Animated.View>
    }

    _renderInicialMarker() {
        if (this.state.to.latitude) {
            return null
        }
        let center = Dimensions.get('window').height / 2 - 46
        return <View style={{
            position: 'absolute',
            zIndex: 1,
            top: center,
            alignItems: 'center',
            alignSelf: 'center'
        }}>
            <Image
                source={require('../../assets/images/userMarker.png')}
                style={{
                    flex: 1,
                    width: 44,
                    height: 53.3,
                }}
            />

        </View>
    }

    _renderFromMarker() {
        return this.state.to.latitude ? <Marker
            anchor={{ x: 0.5, y: 0.87 }}
            coordinate={{
                latitude: this.props.map.from.latitude,
                longitude: this.props.map.from.longitude,
            }}
        >
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../../assets/images/userMarker.png')}
                    style={{
                        flex: 1,
                        width: 44,
                        height: 53.3,
                    }}
                />
            </View>
        </Marker> : null
    }

    _renderToMarker() {
        return this.state.to.latitude ?
            <Marker
                coordinate={{
                    latitude: this.state.to.latitude,
                    longitude: this.state.to.longitude,
                }}
            /> :
            null
    }

    render() {
        console.log(this.state.to);

        return (<View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('DrawerOpen')
                    }}
                    activeOpacity={0.7}
                    style={styles.menuButton}>
                    <Image
                        style={{
                            height: 14,
                            width: 20
                        }}
                        source={require('../../assets/icons/menu.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {this.props.map.from.city}
                </Text>
            </View>
            <MapView
                onRegionChange={() => {
                    if (this.state.modalControllerVisible && !this.state.to.latitude) {
                        this.state.modalControllerVisible = false
                        this.marginAnimation(Dimensions.get('window').height + 220)
                    }
                }}
                onRegionChangeComplete={(e) => {
                    if (!this.state.modalControllerVisible && !this.state.to.latitude) {
                        GoogleApi.getPlace({
                            latitude: e.latitude,
                            longitude: e.longitude
                        }).then(responseJson => {
                            console.log(responseJson);
                            
                            this.props.dispatch({
                                type: 'SET_FROM',
                                value: {
                                    latitude: e.latitude,
                                    longitude: e.longitude,
                                    short_name: responseJson[0].address_components[1].short_name,
                                    address: responseJson[0].formatted_address,
                                    latitudeDelta: 0.06,
                                    longitudeDelta: 0.06,
                                    city: responseJson[2].address_components[2].long_name
                                }
                            })
                        }).catch((error) => {
                            console.log(error);

                        })
                        this.state.modalControllerVisible = true
                        this.marginAnimation(Dimensions.get('window').height - 62)
                    }
                }}
                ref={ref => this.map = ref}
                style={styles.map}
                initialRegion={{
                    latitude: this.props.map.from.latitude,
                    longitude: this.props.map.from.longitude,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                }}
            >
                {this._renderToMarker()}
                {this._renderFromMarker()}
                {this.state.to.latitude ?
                    <MapViewDirections
                        strokeWidth={3}
                        strokeColor='#7f2c26'
                        origin={{
                            latitude: this.props.map.from.latitude,
                            longitude: this.props.map.from.longitude,
                        }}
                        destination={{
                            latitude: this.state.to.latitude,
                            longitude: this.state.to.longitude,
                        }}
                        apikey={this.API_KEY}
                    /> :
                    null
                }
                {/* <Marker
                    coordinate={{
                        latitude: this.props.map.from.latitude,
                        longitude: this.props.map.from.longitude,
                    }}
                /> */}
            </MapView>
            {this._renderModalController()}
            {this._renderInicialMarker()}
        </View>);
    }
}

export const Home = connect(
    ({ map, user }) => ({ map, user })
)(HomeClass)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        // flex: 1,
        // position: 'absolute',
        height: Dimensions.get('window').height
    },
    header: {
        zIndex: 2,
        height: 38,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: 'rgb(44, 62, 80)',
    },
    menuButton: {
        position: 'absolute',
        left: 15,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemsContainer: {
        position: 'absolute',
        bottom: 15,
        height: 255,
        left: 15,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20,
        shadowOpacity: 1,
    },
    item: {
        height: 48,
        marginHorizontal: 20,
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    rideButton: {
        marginTop: 10,
        height: 40,
        marginHorizontal: '30%',
        backgroundColor: '#2ecc71',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rideButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#fff',
    }
});
