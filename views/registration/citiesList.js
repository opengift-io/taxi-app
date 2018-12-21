import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';

export default class CitiesList extends Component {
    api = new API()
    page = 2
    defaultCities = []
    searchValue = ''

    constructor(props) {
        super(props)
        this.state = {
            cities: [],
            listLoading: true

        }
        const { params } = this.props.navigation.state
        this.defaultCities = params.items
        this.state.cities = params.items
    }

    getPage() {
        const { params } = this.props.navigation.state
        //5bf1aaf9af959e02a4f49782
        //params.countryId

        this.api.cities(
            params.countryId,
            this.page,
            this.searchValue
        ).then((res) => {
            console.log(res);
            console.log(res._links.next);
            this.page++
            if (res._links.next) {
                this.setState({
                    cities: [...this.state.cities, ...res._items]
                })
            }
            else {
                this.setState({
                    cities: [...this.state.cities, ...res._items],
                    listLoading: false
                })
            }
        }).catch((error) => {
            console.log(error);

        })
    }

    renderFooter = () => {
        if (!this.state.listLoading) return null;
        return (
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: 16
                }}
            >
                <BarIndicator
                    size={40}
                    count={7}
                    color='#2ecc71'
                />
            </View>
        );
    };

    _renderCitiesList() {
        return (<FlatList
            ref={ref => this.scrollView = ref}
            initialNumToRender={25}
            //maxToRenderPerBatch={1}
            onEndReachedThreshold={0.1}
            keyExtractor={(item, index) => index.toString()}
            scrollToEnd={() => { console.log('end list') }}
            style={{ width: '100%' }}
            data={this.state.cities}
            renderItem={({ item }) => (<TouchableOpacity
                onPress={() => {
                    const { params } = this.props.navigation.state
                    Keyboard.dismiss()
                    params.selectCity(item.title)
                    this.props.navigation.goBack()
                }}
                style={styles.cityItem}
            >
                <Text style={styles.itemText1}>
                    {item.title}
                </Text>
                <Text style={styles.itemText2}>
                    District of Columbia
                </Text>
            </TouchableOpacity>)}
            ListFooterComponent={this.renderFooter}
            onEndReached={() => {
                if (this.state.listLoading) {
                    this.getPage()
                }
            }
            }
        />)
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
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
                            style={styles.iconContainer}>
                            <Image
                                style={{ width: 11, height: 20 }}
                                source={require('../../assets/icons/back.png')}
                            />
                            <Text style={styles.backText}>
                                Back
                        </Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                            Choose a city
                    </Text>
                    </View>
                    <View style={styles.searchBar}>
                        <View style={styles.searchIconContainer}>
                            <Image
                                style={{ width: 20, height: 20 }}
                                source={require('../../assets/icons/search.png')}
                            />

                        </View>
                        <TextInput
                            onChangeText={(text) => {
                                this.searchValue = text
                                const { params } = this.props.navigation.state
                                //5bf1aaf9af959e02a4f49782
                                //params.countryId
                                this.page = 1
                                this.setState({
                                    listLoading: true
                                })
                                this.api.cities(
                                    params.countryId,
                                    this.page,
                                    this.searchValue
                                ).then((res) => {
                                    console.log(res);
                                    console.log(res._links.next);
                                    this.page++
                                    this.scrollView.scrollToOffset({x: 0, y: 0, animated: false})
                                    if (res._links.next) {
                                        this.setState({
                                            cities: res._items
                                        })
                                    }
                                    else {
                                        this.setState({
                                            cities: res._items,
                                            listLoading: false
                                        })
                                    }
                                }).catch((error) => {
                                    console.log(error);

                                })
                            }}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder='Enter the name of the city'
                        />
                    </View>
                    {this._renderCitiesList()}
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 38,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
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
    searchBar: {
        height: 45,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#2ecc71',
        marginHorizontal: 20
    },
    searchIconContainer: {
        position: 'absolute',
        left: 0
    },
    input: {
        fontFamily: 'Roboto-Regular',
        color: 'rgb(44, 62, 80)',
        flex: 1,
        marginLeft: 40,
        fontSize: 16,
    },
    cityItem: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
    },
    itemText1: {
        color: 'rgb(44, 62, 80)',
        marginLeft: 20,
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    },
    itemText2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        marginLeft: 20,
        color: 'rgba(0,0,0,0.1)'
    }
});
