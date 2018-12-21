import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Keyboard,
    ScrollView,
    TextInput
} from 'react-native';
import { GoogleApi } from '../../../networking/google.api'
import { connect } from 'react-redux'

class PlaceModalFromClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemIndex: null,
            places: [],
        }
    }

    componentDidMount() {
        this.setAddresses(this.props.map.from.short_name)
    }

    setAddresses(e) {
        let request =
        {
            location: (this.props.map.from.latitude + "," + this.props.map.from.longitude),
            radius: 200000,
            name: e
        }

        GoogleApi.autoComplate(request).then(res => {
            this.scrollView.scrollTo({x: 0, y: 0, animated: false})
            let addresses = res.map(d => {
                return {
                    short_name: d.structured_formatting.main_text,
                    address: d.structured_formatting.secondary_text,
                    place_id: d.place_id
                }
            })
            this.setState({
                places: addresses,
                itemIndex: null,
            })
        })
    }

    _renderPlaceList() {
        return this.state.places.map((item, i) => (<TouchableOpacity
            onPress={() => {
                Keyboard.dismiss()
                this.setState({
                    itemIndex: i
                })
            }}
            key={i}
            style={[styles.cityItem, this.state.itemIndex == i ?
                { backgroundColor: '#2ecc71' } :
                null
            ]}
        >
            <Text style={[styles.itemText1, this.state.itemIndex == i ?
                { color: '#fff' } :
                null
            ]}>
                {item.short_name}
            </Text>
            <Text style={[styles.itemText2, this.state.itemIndex == i ?
                { color: '#fff' } :
                null]}>
                {item.address}
            </Text>
        </TouchableOpacity>))
    }

    render() {
        return (<Animated.View
            style={[styles.itemsContainer, {
                bottom: this.props.placeAnim
            }]}>
            <View
                onPress={() => {

                }}
                activeOpacity={0.5}
                style={styles.item}>
                <TextInput
                    onChangeText={(text) => {
                        this.setAddresses(text)
                    }}
                    defaultValue={this.props.map.from.short_name}
                    placeholder='Search...'
                    style={styles.input} />

            </View>
            <ScrollView
                ref={ref => this.scrollView = ref}
                keyboardShouldPersistTaps='always'
            >
                {this._renderPlaceList()}
            </ScrollView>
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
                        if (this.state.itemIndex == null) {
                            this.props.close()
                        }
                        else {
                            GoogleApi.getLocationFromID(this.state.places[this.state.itemIndex].place_id).then((res) => {
                                let region = {
                                    latitude: res.geometry.location.lat,
                                    longitude: res.geometry.location.lng,
                                    address: res.formatted_address,
                                    latitudeDelta: 0.06,
                                    longitudeDelta: 0.06,
                                    short_name: this.state.places[this.state.itemIndex].short_name,
                                }
                                this.props.done(region)
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
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

export const PlaceModalFrom = connect(
    ({ map }) => ({ map })
)(PlaceModalFromClass)

const styles = StyleSheet.create({
    content: {

    },
    itemsContainer: {
        position: 'absolute',
        height: 260,
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
    itemText1: {
        color: 'rgb(44, 62, 80)',
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    },
    itemText2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgba(0,0,0,0.1)'
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
    }
});
