import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native';
import { PlaceModalFrom } from './placeModalFrom'
import { PlaceModalTo } from './placeModalTo'
import { connect } from 'react-redux'
import { FareModal } from './fareModal'
import { CommentModal } from './commentModal'
import API from '../../../networking/api'
import { GoogleApi } from '../../../networking/google.api'

class ModalControllerClass extends Component {
    api = new API()
    controllerAnim = new Animated.Value(15)
    placeAnimFrom = new Animated.Value(-260)
    placeAnimTo = new Animated.Value(-260)
    fareAnim = new Animated.Value(-192)
    commentAnim = new Animated.Value(-192)

    constructor(props) {
        super(props)
        this.state = {
            to: {
                short_name: '',
            },
            fare: '',
            wishes: {
                comment: '',
                child: 0,
                passengers: 0
            }
        }
    }

    _renderValueText(to) {
        return to.address ?
            true :
            false
    }

    savePlaceFrom(from) {
        //this.props.dispatch({ type: 'SET_FROM', value: from })
        this.props.animateToCoordinate(from)
    }

    savePlaceTo(to) {
        this.setState({
            to: to
        })
        this.props.setTo({
            latitude: to.latitude,
            longitude: to.longitude,
        })
    }

    commentAnimation(controller, commentAnimValue, save, wishes) {
        Animated.parallel([
            Animated.timing(this.controllerAnim, {
                toValue: controller,
                duration: 200
            }),
            Animated.timing(this.commentAnim, {
                toValue: commentAnimValue,
                duration: 200
            })
        ]).start(() => {
            if (save) {
                this.setState({
                    wishes: wishes
                })
            }
        });
    }

    fareAnimation(controller, fareAnimValue, save, fare) {
        Animated.parallel([
            Animated.timing(this.controllerAnim, {
                toValue: controller,
                duration: 200
            }),
            Animated.timing(this.fareAnim, {
                toValue: fareAnimValue,
                duration: 200
            })
        ]).start(() => {
            if (save) {
                this.setState({
                    fare: fare
                })
            }
        });
    }

    placeAnimationFrom(controller, place, save, from) {
        Animated.parallel([
            Animated.timing(this.controllerAnim, {
                toValue: controller,
                duration: 200
            }),
            Animated.timing(this.placeAnimFrom, {
                toValue: place,
                duration: 200
            })
        ]).start(() => {
            if (save) {
                this.savePlaceFrom(from)
            }
        });
    }

    placeAnimationTo(controller, place, save, to) {
        Animated.parallel([
            Animated.timing(this.controllerAnim, {
                toValue: controller,
                duration: 200
            }),
            Animated.timing(this.placeAnimTo, {
                toValue: place,
                duration: 200
            })
        ]).start(() => {
            if (save) {
                this.savePlaceTo(to)
            }
        });
    }

    setRide() {
        if (this.state.to.address) {
            let requestBody={
                location_from_lat: this.props.map.from.latitude,
                location_from_lng: this.props.map.from.longitude,
                location_to_lat: this.state.to.latitude,
                location_to_lng: this.state.to.longitude,
            }
            GoogleApi.getDistance(requestBody).then((info)=>{
                let distance = info.rows[0].elements[0].distance.value
                let bodyData = {
                    address_from: this.props.map.from.address,
                    address_to: this.state.to.address,
                    cost: Number(this.state.fare),
                    customer: this.props.user.info._id,
                    children_qty: this.state.wishes.child,
                    comment: this.state.wishes.comment,
                    location_from_lat: this.props.map.from.latitude,
                    location_from_lng: this.props.map.from.longitude,
                    location_to_lat: this.state.to.latitude,
                    location_to_lng: this.state.to.longitude,
                    distance: distance
                }
                this.api.drivings('POST', bodyData).then((res) => {
                    console.log(res);
                    if (res._status == 'OK') {
                        Alert.alert(
                            '',
                            'Order registered !',
                            [
                                { text: 'OK', onPress: () => { }, style: 'cancel' },
                            ],
                            { cancelable: false }
                        )
                    }
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
            })
            .catch((error)=>{
                console.log(error);
                
            })
       
        }
        else {
            Alert.alert(
                '',
                'Select to point !',
                [
                    { text: 'OK', onPress: () => { }, style: 'cancel' },
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        return (<View style={styles.content}>
            <Animated.View
                style={[styles.itemsContainer, {
                    bottom: this.controllerAnim
                }]}>
                <TouchableOpacity
                    onPress={() => {
                        this.placeAnimationFrom(-260, 15, false, {})
                    }}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            { color: 'rgb(44, 62, 80)' }
                        ]}>
                        {this.props.map.from.address}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.placeAnimationTo(-260, 15, false, {})
                    }}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            this.state.to.address ?
                                { color: 'rgb(44, 62, 80)' } :
                                { color: 'rgb(189,195,199)' }
                        ]}>
                        {this.state.to.address ?
                            this.state.to.address :
                            'To'
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.fareAnimation(-260, 15, false, '')
                    }}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <Text style={[styles.itemText, { color: '#2ecc71' }]}>
                        {'$ '}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            this.state.fare.length > 0 ?
                                { color: 'rgb(44, 62, 80)' } :
                                { color: 'rgb(189,195,199)' }
                        ]}>
                        {this.state.fare.length > 0 ?
                            this.state.fare :
                            'Offer your fare'
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.commentAnimation(-260, 15, false, '')
                    }}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            this.state.wishes.comment ?
                                { color: 'rgb(44, 62, 80)' } :
                                { color: 'rgb(189,195,199)' }
                        ]}>
                        {this.state.wishes.comment ?
                            this.state.wishes.comment :
                            'Comment and wishes'
                        }
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonsRow}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            to: {
                                short_name: '',
                            },
                            fare: '',
                            wishes: {
                                comment: '',
                                child: 0,
                                passengers: 0
                            }
                        })
                        this.props.setTo({})
                        this.props.animateToCoordinate(this.props.map.from)
                    }}
                    activeOpacity={0.7}
                    style={styles.rideButton}>
                    <Text
                        style={styles.rideButtonText}>
                        Reset
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                     this.setRide()
                    }}
                    activeOpacity={0.7}
                    style={styles.rideButton}>
                    <Text
                        style={styles.rideButtonText}>
                        Ride
                        </Text>
                </TouchableOpacity>
                </View>
            </Animated.View>
            <PlaceModalFrom
                close={() => {
                    this.placeAnimationFrom(15, -260, false, {})
                }}
                done={(from) => {
                    this.placeAnimationFrom(15, -260, true, from)
                }}
                placeAnim={this.placeAnimFrom}
            />
            <PlaceModalTo
                to={this.state.to}
                close={() => {
                    this.placeAnimationTo(15, -260, false, {})
                }}
                done={(to) => {
                    this.placeAnimationTo(15, -260, true, to)
                }}
                placeAnim={this.placeAnimTo}
            />
            <FareModal
                close={() => {
                    this.fareAnimation(15, -192, false, '')
                }}
                done={(fare) => {
                    this.fareAnimation(15, -192, true, fare)
                }}
                fareAnim={this.fareAnim}
            />
            <CommentModal
                close={() => {
                    this.commentAnimation(15, -192, false, '')
                }}
                done={(wishes) => {
                    this.commentAnimation(15, -192, true, wishes)
                }}
                commentAnim={this.commentAnim}
                wishes={this.state.wishes}
            />
        </View>);
    }
}

export const ModalController = connect(
    ({ map, user }) => ({ map, user })
)(ModalControllerClass)

const styles = StyleSheet.create({
    content: {

    },
    itemsContainer: {
        position: 'absolute',
        height: 260,
        paddingTop: 5,
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
        flexDirection: 'row',
        height: 48,
        marginHorizontal: 20,
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    buttonsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    rideButton: {
        marginTop: 10,
        height: 40,
        width: '47%',
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
