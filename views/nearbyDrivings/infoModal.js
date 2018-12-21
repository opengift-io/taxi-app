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
import ItemMap from '../requestHistory/itemMap'
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class InfoModal extends Component {

    api = new API()
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { params } = this.props.navigation.state
        let fromCoords = {
            lat: params.location_from_lat,
            lng: params.location_from_lng
        }
        let toCoords = {
            lat: params.location_to_lat,
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
                                fromCoords={fromCoords}
                                toCoords={toCoords}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <View style={styles.itemRowPrice}>
                                <View style={styles.itemIconContainer}>
                                    <Image
                                        style={{ width: 32, height: 32 }}
                                        source={require('../../assets/icons/time.png')}
                                    />
                                    <Text style={styles.priceText}>
                                        19 minutes
                                </Text>
                                </View>
                                <View style={styles.innerLine} />
                                <View style={styles.itemIconContainer}>
                                    <Image
                                        style={{ width: 32, height: 32 }}
                                        source={require('../../assets/icons/time.png')}
                                    />
                                    <Text style={styles.priceText}>
                                        ${params.cost == 0 ? ' - ' : params.cost.toFixed(2)}
                                    </Text>
                                </View>
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
                            <View style={[styles.timeRow, { marginTop: 16 }]}>
                                <View style={styles.photoContainer}>

                                </View>
                                <View style={{
                                    marginLeft: 15
                                }}>
                                    <View style={{
                                        width: 83
                                    }}>
                                        <AirbnbRating
                                            defaultRating={4}
                                            size={11}
                                            isDisabled={true}
                                            showRating={false} />
                                    </View>
                                    <Text style={styles.priceText}>
                                        Billy Bob Thornton
                                        </Text>
                                </View>
                            </View>
                            <View style={styles.silverLiner} />
                            <View style={[styles.textsRow, {
                                marginTop: 20,
                                marginBottom: 6
                            }]}>
                                <Text style={styles.rowText}>
                                    Current Price
                        </Text>
                                <Text style={styles.rowText}>
                                    Offer your Price
                        </Text>
                            </View>
                            <View style={[styles.textsRow,
                            {
                                marginBottom: 15
                            }]}>
                                <View
                                    style={styles.currentPriceItem}
                                >
                                    <Text style={styles.priceText}>
                                        $120
                                        </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        activeOpacity={0.8}
                                        style={styles.offerPriceItem}
                                    >
                                        <Text style={styles.priceText}>
                                            $120
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                style={styles.button}
                            >
                                <Text style={[styles.ButtonText, { color: 'rgb(189, 195, 199)' }]}>
                                    Reject
                                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('orderMap')
                                }}
                                style={styles.button}
                            >
                                <Text style={[styles.ButtonText, { color: '#2ecc71' }]}>
                                    Accept
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
        height: 57,
        marginBottom: 10
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
    rowText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(189, 195, 199)'
    },
    silverLiner: {
        height: 1,
        backgroundColor: '#e5e3dd',
        marginTop: 16
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
    },
    itemIconContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerLine: {
        height: 57,
        width: 1,
        backgroundColor: '#e5e3dd'
    },
    pointLine: {
        backgroundColor: '#e5e3dd',
        height: 1
    },
    photoContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'silver'
    },
    textsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    offerPriceItem: {
        height: 30,
        width: 53,
        //backgroundColor: '#2ecc71',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentPriceItem: {
        height: 30,
        justifyContent: 'center',
    }
});
