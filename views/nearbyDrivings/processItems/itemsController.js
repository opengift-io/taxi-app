import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from '../costomMarker'
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class ItemsController extends Component {
    sliderLength = Dimensions.get('window').width - 70
    inPlaceItemAnim = new Animated.Value(15)
    rideItemAnim = new Animated.Value(15)

    constructor(props) {
        super(props)

    }

    render() {
        return (<View style={styles.content}>
            <View style={styles.inPlaceItem}>
                <Text style={styles.itemTitle}>
                    Washington St.15-200
            </Text>
                <View>
                    <MultiSlider
                        selectedStyle={{
                            borderRadius: 2,
                            backgroundColor: 'gold',
                        }}
                        unselectedStyle={{
                            backgroundColor: 'silver',
                            borderTopRightRadius: 2,
                            borderBottomRightRadius: 2
                        }}
                        values={[5]}
                        max={15}
                        containerStyle={{
                            height: 35,
                        }}
                        trackStyle={{
                            height: 5,
                        }}
                        touchDimensions={{
                            height: 35,
                            width: 35,
                            borderRadius: 20,
                            slipDisplacement: 35,
                        }}
                        customMarker={CustomMarker}
                        sliderLength={this.sliderLength}
                        markerOffsetY={-6}
                        snapped={false}
                    />
                    <View style={styles.disabledView} />
                </View>
                <View style={[styles.timeRow, { marginBottom: 15 }]}>
                    <View style={styles.photoContainer}>
                        <View style={styles.phoneContainer}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../../assets/icons/phone.png')}
                            />
                        </View>
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
                <TouchableOpacity
                    onPress={() => {

                    }}
                    activeOpacity={0.8}
                    style={styles.itemButton}
                >
                    <Text style={[styles.priceText, { color: '#fff' }]}>
                        I’m Here
                    </Text>
                </TouchableOpacity>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    inPlaceItem: {
        position: 'absolute',
        height: 218,
        paddingHorizontal: 20,
        left: 15,
        right: 15,
        bottom: 15,
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
    itemTitle: {
        marginTop: 24,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(44, 62, 80)'
    },
    disabledView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent'
    },
    photoContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'silver'
    },
    priceText: {
        lineHeight: 18,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(44, 62, 80)'
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    silverLiner: {
        height: 1,
        backgroundColor: '#e5e3dd',
    },
    phoneContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#2ecc714d',

        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemButton: {
        marginTop: 15,
        alignSelf: 'center',
        height: 40,
        width: 129,
        backgroundColor: '#2ecc71',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
