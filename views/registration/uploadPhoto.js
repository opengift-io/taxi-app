import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Image,
    ImageBackground
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

class UploadPhoto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null
        }
    }

    uploadImage() {
        const options = {
            title: 'Select Avatar',
            //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
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
                    <Text style={styles.headerText}>
                        Photo
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Upload a photo
                </Text>
                    <View style={styles.photoContainer}>
                        <Image
                            source={this.state.avatarSource == null ?
                                require('../../assets/images/1.png') :
                                this.state.avatarSource
                            }
                            style={styles.uploadAvatar} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatch({ type: 'SET_LOGIN', value: true })
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
                            this.uploadImage()
                        }}
                        activeOpacity={0.8}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Take a Photo
                </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default connect()(UploadPhoto)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        marginBottom: 22,
        color: 'rgb(44, 62, 80)',
    },
    photoContainer: {
        marginBottom: 20,
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    button: {
        marginTop: 20,
        height: 30,
        width: 132,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2ecc71',
        borderWidth: 2
    },
    buttonText: {
        color: 'rgb(44, 62, 80)',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: 'rgb(44, 62, 80)',
    },
    nextButton: {
        height: 30,
        width: 132,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    nextButtonText: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: '#fff'
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
    uploadAvatar: {
        flex: 1,
        width: '100%',
        borderRadius: 50
    }
});
