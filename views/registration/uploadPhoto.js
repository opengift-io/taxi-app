import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class UploadPhoto extends Component {

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
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            this.props.navigation.goBack()
                        }}
                        activeOpacity={0.8}
                        style={styles.backIconContainer}>
                        <Image
                                    style={{ width: 30, height: 30 }}
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
            </View>
        );
    }
}

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
        fontSize: 25,
        marginBottom: 15,
    },
    photoContainer: {
        marginBottom: 20,
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    button: {
        marginVertical: 20,
        height: 40,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3dc464',
        borderWidth: 3
    },
    buttonText: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.2)'
    },
    nextButton: {
        height: 40,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3dc464'
    },
    nextButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    header: {
        height: 46,
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
        fontSize: 15,
        fontWeight: '600'
    },
    backText: {
        color: '#3dc464',
        fontSize: 16,
    },
    uploadAvatar: {
        flex: 1,
        width: '100%',
        borderRadius: 50
    }
});
