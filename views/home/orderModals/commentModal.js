import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Keyboard,
    TextInput,
    Image
} from 'react-native';
import { Switch } from '../../../components/switch/switch'

export class CommentModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            passengers: false,
            child: false
        }
    }

    render() {
        return (<Animated.View
            style={[styles.itemsContainer, {
                bottom: this.props.commentAnim
            }]}>
            <View
                onPress={() => {

                }}
                activeOpacity={0.5}
                style={styles.item}>
                <TextInput
                    onChangeText={(text) => {
                        this.setState({
                            comment: text
                        })
                    }}
                    value={this.state.comment}
                    placeholder='Comment to the driver'
                    style={styles.input} />

            </View>
            <View style={styles.checkboxItem}>
                <View style={styles.itemLeft}>
                    <Image
                        style={{ width: 14, height: 16 }}
                        source={require('../../../assets/icons/bus.png')}
                    />
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText,
                        {
                            color: this.state.passengers ?
                                'rgb(44, 62, 80)' :
                                'rgb(189, 195, 199)'
                        }
                        ]}>
                        More than 4 passengers
                </Text>
                </View>
                <Switch
                    active={this.state.passengers}
                    switchWidth={54}
                    switchHeight={30}
                    buttonRadius={15}
                    activeBackgroundColor='#2ecc71'
                    inactiveBackgroundColor='#fff'
                    inactiveButtonPressedColor='#fff'
                    inactiveButtonColor='#fff'
                    onChangeState={(value) => {
                        this.setState({
                            passengers: value
                        })
                    }} />
            </View>
            <View style={styles.checkboxItem}>
                <View style={styles.itemLeft}>
                    <Image
                        style={{ width: 14, height: 20 }}
                        source={require('../../../assets/icons/baby.png')}
                    />
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText,
                        {
                            color: this.state.child ?
                                'rgb(44, 62, 80)' :
                                'rgb(189, 195, 199)'
                        }
                        ]}>
                        Child safety seat
                </Text>
                </View>
                <Switch
                    active={this.state.child}
                    switchWidth={54}
                    switchHeight={30}
                    buttonRadius={15}
                    activeBackgroundColor='#2ecc71'
                    inactiveBackgroundColor='#fff'
                    inactiveButtonPressedColor='#fff'
                    inactiveButtonColor='#fff'
                    onChangeState={(value) => {
                        this.setState({
                            child: value
                        })
                    }} />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss()
                        this.props.close()
                        setTimeout(()=>{
                            this.setState({
                                comment: this.props.wishes.comment,
                                passengers: this.props.wishes.passengers == 0 ? false : true,
                                child: this.props.wishes.child == 0 ? false : true
                            })
                        },300)
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
                        this.props.done({
                            comment: this.state.comment,
                            child: this.state.child ? 1 : 0,
                            passengers: this.state.passengers ? 1 : 0
                        })
                        // setTimeout(() => {
                        //     this.setState({
                        //         comment: '',
                        //         child: false,
                        //         passengers: false
                        //     })
                        // }, 300)
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
    itemText: {
        marginLeft: 11,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
    },
    checkboxItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginHorizontal: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
