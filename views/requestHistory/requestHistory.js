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
import ItemMap from './itemMap'
import { connect } from 'react-redux'

class RequestHistory extends Component {
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
            customer: this.props.user.info._id,
        }
        this.api.drivings('GET', bodyData, this.page, null).then((res) => {
            console.log(res);
            this.page++
            if (res._items.length == 0) {
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
                        this.props.navigation.navigate('orderInfoModal', {
                            ...item,
                            formatDate: formatDate
                        })
                    }}
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.itemMapContainer}>
                            <ItemMap
                                fromCoords={fromCoords}
                                toCoords={toCoords}
                            />
                        </View>
                        <View style={{ margin: 20 }}>
                            <View style={styles.itemRowPrice}>
                                <Text style={styles.priceText}>
                                    {formatDate}
                                </Text>
                                <Text style={styles.priceText}>
                                    ${item.cost == 0 ? ' - ' : item.cost.toFixed(2)}
                                </Text>
                            </View>
                            <View style={styles.priceLine} />
                            <View style={[styles.pointRow, { marginTop: 18 }]}>
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
                            <View style={styles.timeRow}>
                                <View style={styles.timeLine} />
                                <Text style={styles.timeText}>
                                    19 minutes        15.20 — 16.24
                        </Text>
                            </View>
                            <View style={styles.pointRow}>
                                <Image
                                    style={{
                                        marginRight: 8.7,
                                        width: 10.3,
                                        height: 15.5
                                    }}
                                    source={require('../../assets/icons/marker.png')}
                                />
                                <Text style={[styles.priceText, { marginRight: 20, }]}>
                                    {item.address_to}
                                </Text>
                            </View>
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
)(RequestHistory)

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
    }
});
