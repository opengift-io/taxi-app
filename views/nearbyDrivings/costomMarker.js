import React from 'react';
import { Image } from 'react-native';

class CustomMarker extends React.Component {
    render() {
        return (
            <Image
                style={{
                    width: 10.3,
                    height: 15.5,
                }}
                source={require('../../assets/icons/marker.png')}
            />
        );
    }
}

export default CustomMarker;