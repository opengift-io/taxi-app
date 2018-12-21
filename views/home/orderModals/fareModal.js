import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Keyboard,
    TextInput
} from 'react-native';

export class FareModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            fare: ''
        }
    }

    render() {
        return (<Animated.View
            style={[styles.itemsContainer, {
                bottom: this.props.fareAnim
            }]}>
            <View>
                <View
                    onPress={() => {

                    }}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <Text style={[styles.input, { color: '#2ecc71' }]}>$</Text>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                fare: text
                            })
                        }}
                        value={this.state.fare}
                        keyboardType='numeric'
                        placeholder='Fare'
                        style={[styles.input, { flex: 1 }]} />

                </View>
                <Text style={styles.desc}>
                    Offer a reasonable fare to make your request more attractive
            </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss()
                        this.props.close()
                    }}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        Close
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss()
                        this.props.done(this.state.fare)
                        setTimeout(() => {
                            this.setState({
                                fare: ''
                            })
                        }, 300)
                    }}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        Done
                        </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>);
    }
}

const styles = StyleSheet.create({
    content: {

    },
    itemsContainer: {
        position: 'absolute',
        height: 192,
        justifyContent: 'space-between',
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
        alignItems: 'center',
        height: 48,
        marginHorizontal: 20,
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    input: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(44, 62, 80)'
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
    },
    cityItem: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    buttonsContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#2ecc71'
    },
    desc: {
        margin: 20,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgb(44, 62, 80)',
        lineHeight: 24
    }
});
