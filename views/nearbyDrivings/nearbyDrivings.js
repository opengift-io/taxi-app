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
import { NavigationActions } from 'react-navigation'
import API from '../../networking/api'
import { BarIndicator } from 'react-native-indicators';
import ItemMap from '../requestHistory/itemMap'
import { connect } from 'react-redux'

class NearbyDrivings extends Component {
    weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    page = 1
    api = new API()
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            listLoading: true,
            empty: false
        }
    }

    componentDidMount() {
        this.getPage()
    }

    _renderEmpty() {
        return this.state.empty ?
            <Text style={styles.emptyText}>
                Is Empty
        </Text> : null
    }

    getPage() {
        bodyData = {
            status: 'new',
        }
        this.api.drivings('GET', bodyData, this.page, null).then((res) => {
            console.log(res);
            this.page++
            if (res._items == 0) {
                this.setState({
                    empty: true,
                    listLoading: false
                })
            }
            else if (res._links.next) {
                this.setState({
                    items: [...this.state.items, ...res._items]
                })
            }
            else {
                this.setState({
                    items: [...this.state.items, ...res._items],
                    listLoading: false
                })
            }
        })
            .catch((error) => {
                console.log(error);
                this.setState({
                    listLoading: false
                })
                Alert.alert(
                    '',
                    'Server Error !',
                    [
                        { text: 'Close', onPress: () => { }, style: 'cancel' },
                    ],
                    { cancelable: false }
                )
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
                    color='#fff'
                />
            </View>
        );
    };

    _renderList() {
        return (<FlatList
            contentContainerStyle={{ paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={25}
            //maxToRenderPerBatch={1}
            onEndReachedThreshold={0.1}
            keyExtractor={(item, index) => index.toString()}
            scrollToEnd={() => { console.log('end list') }}
            style={{ width: '100%' }}
            data={this.state.items}
            renderItem={({ item }) => {
                let date = new Date(item._created)
                let formatDate = this.weekdays[date.getDay()] + ', ' + date.getDate() + ' ' + this.months[date.getMonth() - 1]
                let fromCoords = {
                    lat:item.location_from_lat,
                    lng: item.location_from_lng
                }
                let toCoords = {
                    lat:item.location_to_lat,
                    lng: item.location_to_lng
                }

                return (<TouchableNativeFeedback
                    onPress={() => {
                        this.props.navigation.navigate('infoModal', {
                            ...item,
                            formatDate: formatDate
                        })
                    }}
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.itemMapContainer}>
                            <ItemMap
                        fromCoords = {fromCoords}
                        toCoords = {toCoords}
                        />
                        </View>
                        <View style={{
                             marginTop: 20,
                             marginHorizontal: 20
                              }}>
                            <View style={styles.itemRowPrice}>
                                <View style={styles.itemIconContainer}>
                                    <Image
                                        style={{ width: 32, height: 32 }}
                                        source={require('../../assets/icons/time.png')}
                                    />
                                    <Text style={styles.priceText}>
                                        19 minutes
                            </Text>
                                </View>
                                <View style={styles.innerLine} />
                                <View style={styles.itemIconContainer}>
                                    <Image
                                        style={{ width: 32, height: 32 }}
                                        source={require('../../assets/icons/time.png')}
                                    />
                                    <Text style={styles.priceText}>
                                        ${item.cost == 0 ? ' - ' : item.cost.toFixed(2)}
                            </Text>
                                </View>
                            </View>
                            <View style={styles.priceLine} />
                            <View style={[styles.pointRow, { marginVertical: 18 }]}>
                                <Image
                                    style={{
                                        marginRight: 8.7,
                                        width: 10.3,
                                        height: 15.5
                                    }}
                                    source={require('../../assets/icons/marker.png')}
                                />
                                <Text style={[styles.priceText, { marginRight: 20, }]}>
                                    {item.address_from}
                            </Text>
                            </View>
                            <View style={styles.pointLine}/>
                        </View>
                        <View style={styles.buttonsRow}>
                        <TouchableOpacity
                        style={styles.button}>
                                    <Text style={[styles.ButtonText, {color: 'rgb(189, 195, 199)'}]}>
                                    Reject
                                    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('orderMap')
                        }}
                        style={styles.button}>
                                    <Text style={[styles.ButtonText, {color: '#2ecc71'}]}>
                                    Accept
                                    </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </TouchableNativeFeedback>)
            }}
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(NavigationActions.back())
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
                        My Trip
                    </Text>
                </View>
                <View style={styles.content}>
                    {this._renderList()}
                    {this._renderEmpty()}
                </View>
            </View>
        );
    }
}

export default connect(
    ({ user }) => ({ user })
)(NearbyDrivings)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    content: {
        flex: 1,
        backgroundColor: '#2ecc71',
    },
    itemContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        minHeight: 285,
        borderRadius: 4,
        elevation: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        borderRadius: 4
    },
    itemMapContainer: {
        height: 129,
        backgroundColor: '#ece9e1'
    },
    itemRowPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 57,
        marginBottom: 10
    },
    priceText: {
        lineHeight: 18,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgb(44, 62, 80)'
    },
    priceLine: {
        backgroundColor: '#2ecc71',
        height: 2,
        marginTop: 8
    },
    pointRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLine: {
        height: 14,
        width: 1,
        backgroundColor: 'rgb(189, 195, 199)',
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 7
    },
    timeText: {
        marginLeft: 13,
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(189, 195, 199)'
    },
    map: {
        flex: 1,
    },
    emptyText: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 30,
        color: '#fff'
    },
    itemIconContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerLine: {
        height: 57,
        width: 1,
        backgroundColor: '#e5e3dd'
    },
    pointLine:{
        backgroundColor: '#e5e3dd',
        height: 1
    },
    buttonsRow:{
        height:56,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button:{
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto-Regular',
    }
});
