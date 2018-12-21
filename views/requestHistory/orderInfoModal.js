import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import API from '../../networking/api'
import ItemMap from './itemMap'

export default class OrderInfoModal extends Component {

    api = new API()
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    deleteOrder() {
        const { params } = this.props.navigation.state

        this.api.drivings('DELETE', null, null, params._id ).then((res) => {
            console.log(res);

        })
            .catch((error) => {
                console.log(error);

            })
    }


    render() {
        const { params } = this.props.navigation.state
        let fromCoords = {
            lat:params.location_from_lat,
            lng: params.location_from_lng
        }
        let toCoords = {
            lat:params.location_to_lat,
            lng: params.location_to_lng
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(NavigationActions.back())
                        }}
                        activeOpacity={0.8}
                        style={styles.backIconContainer}>
                        <Image
                            style={{ width: 11, height: 20 }}
                            source={require('../../assets/icons/back.png')}
                        />
                        <Text style={styles.backText}>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        My Trip
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemMapContainer}>
                        <ItemMap
                            fromCoords = {fromCoords}
                            toCoords = {toCoords}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <View style={styles.itemRowPrice}>
                                <Text style={styles.priceText}>
                                    {params.formatDate}
                                </Text>
                                <Text style={styles.priceText}>
                                    ${params.cost == 0 ? ' - ' : params.cost.toFixed(2)}
                                </Text>
                            </View>
                            <View style={styles.priceLine} />
                            <View style={[styles.pointRow, { marginTop: 18 }]}>
                                <Image
                                    style={{
                                        marginRight: 8.7,
                                        width: 10.3,
                                        height: 15.5
                                    }}
                                    source={require('../../assets/icons/marker.png')}
                                />
                                <Text style={styles.priceText}>
                                    {params.address_from}
                                </Text>
                            </View>
                            <View style={styles.timeRow}>
                                <View style={styles.timeLine} />
                                <Text style={styles.timeText}>
                                    19 minutes        15.20 — 16.24
                        </Text>
                            </View>
                            <View style={styles.pointRow}>
                                <Image
                                    style={{
                                        marginRight: 8.7,
                                        width: 10.3,
                                        height: 15.5
                                    }}
                                    source={require('../../assets/icons/marker.png')}
                                />
                                <Text style={styles.priceText}>
                                    {params.address_to}
                                </Text>
                            </View>
                            <View style={styles.silverLiner} />
                            <Text style={styles.smallTitle}>
                                About Driver
                            </Text>
                            <Text style={[styles.priceText, { marginTop: 10 }]}>
                                Billy Bob Thornton
                            </Text>
                            <Text style={styles.smallTitle}>
                                About Driver
                            </Text>
                            <Text style={[styles.priceText, { marginTop: 10 }]}>
                                Billy Bob Thornton
                            </Text>
                            <View style={styles.silverLiner} />

                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                style={styles.button}
                            >
                                <Text style={[styles.ButtonText, { color: '#2ecc71' }]}>
                                    Close
                                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{
                                //this.deleteOrder()
                            }}
                                style={styles.button}
                            >
                                <Text style={[styles.ButtonText, { color: 'rgb(248, 0, 19)' }]}>
                                    Delete Trip

                                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#fff',
        height: 38,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIconContainer: {
        position: 'absolute',
        left: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(44, 62, 80)',
    },
    backText: {
        marginLeft: 10,
        color: '#2ecc71',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    content: {
        flex: 1,
        backgroundColor: '#2ecc71',
    },
    itemContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        borderRadius: 4
    },
    itemMapContainer: {
        height: 129,
        backgroundColor: '#ece9e1'
    },
    itemRowPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        lineHeight: 18,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(44, 62, 80)'
    },
    priceLine: {
        backgroundColor: '#2ecc71',
        height: 2,
        marginTop: 8
    },
    pointRow: {
        flexDirection: 'row',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLine: {
        height: 14,
        width: 1,
        backgroundColor: 'rgb(189, 195, 199)',
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 7
    },
    timeText: {
        marginLeft: 13,
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(189, 195, 199)'
    },
    silverLiner: {
        height: 1,
        backgroundColor: '#e5e3dd',
        marginTop: 16
    },
    smallTitle: {
        marginTop: 19,
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(189, 195, 199)'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
    },
    button: {
        paddingHorizontal: 20,
        height: '100%',
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto-Regular',
    }
});
