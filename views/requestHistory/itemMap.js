import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TouchableNativeFeedback,
    Alert
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class ItemMap extends Component {
    API_KEY = "AIzaSyAZyt6rmlKXP13D0UMjD2WQw-GXzihWgfM"
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.map!=null){
            this.timeout = setTimeout(() => {
                this.map.fitToCoordinates(
                    [
                        {
                            latitude: this.props.fromCoords.lat,
                            longitude:this.props.fromCoords.lng
                        },
                        {
                            latitude: this.props.toCoords.lat,
                            longitude: this.props.toCoords.lng
                        },
                    ],
                    {
                        //edgePadding: { top: 1, right: 1, bottom: 1, left: 1 },
                        animated: false
                    }
                )
            }, 500);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }


    render() {
        return (
            <MapView
            ref={ref=>this.map=ref}
            scrollEnabled={false}
            zoomEnabled={false}
            style={styles.map}
            region={{
                latitude: this.props.fromCoords.lat,
                longitude:this.props.fromCoords.lng,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06
            }}
        >
            <MapViewDirections
                strokeWidth={3}
                strokeColor='#7f2c26'
                origin={{
                    latitude: this.props.fromCoords.lat,
                    longitude:this.props.fromCoords.lng,
                }}
                destination={{
                    latitude: this.props.toCoords.lat,
                    longitude: this.props.toCoords.lng
                }}
                apikey={this.API_KEY}
            />
        </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
