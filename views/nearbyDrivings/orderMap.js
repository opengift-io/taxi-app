import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ItemsController from './processItems/itemsController'

export default class OrderMap extends Component {
    API_KEY = "AIzaSyAZyt6rmlKXP13D0UMjD2WQw-GXzihWgfM"
    sliderLength = Dimensions.get('window').width - 70

    constructor(props) {
        super(props)

    }

    render() {
        return (<View style={styles.content}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack()
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
                <Text style={styles.headerTitle}>
                    City
                </Text>
            </View>
            {/* <MapView
                style={styles.map}
                region={{
                    latitude: 40,
                    longitude: 40,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                }}>

            </MapView> */}
          <ItemsController/>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#ece9e1'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        zIndex: 2,
        height: 38,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIconContainer: {
        position: 'absolute',
        left: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 10,
        color: '#2ecc71',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    headerTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: 'rgb(44, 62, 80)',
    },
});
